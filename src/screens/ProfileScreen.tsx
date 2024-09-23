import { useMutateUser } from '@/api/user/useMutateUser';
import { useLoadedUser } from '@/api/user/useUser';
import { AvatarPlaceholderSvg } from '@/components/svg/AvatarPlaceholderSvg';
import { ImageUploadIconSvg } from '@/components/svg/ImageUploadIconSvg';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Spacer } from '@/components/ui/Spacer';
import { Heading, Text } from '@/components/ui/Text';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import * as Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { decode } from 'base64-arraybuffer';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Fragment, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import type { MainTabsParams } from '../../App';

const choosableColors = [
  '#FFFFFF',
  '#C62958',
  '#48FF91',
  '#38B3F8',
  '#F87D38',
  '#FFF96D',
  '#955AC4',
  '#00D3D3',
];

export const ProfileScreen = () => {
  const { user } = useLoadedUser();
  const [selectedColor, setSelectedColor] = useState(
    user.color || choosableColors[0]
  );
  const [avatarImageUri, setAvatarImageUri] = useState(user.avatar || null);
  const [displayName, setDisplayName] = useState(user.display_name || '');
  const { mutateUserAsync } = useMutateUser();
  const { navigate } = useNavigation();
  const { params } = useRoute<
    | RouteProp<ReactNavigation.RootParamList, 'Profile'>
    | RouteProp<MainTabsParams, 'Profile'>
  >();
  const isTab = params?.isTab;

  const onPressAddImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
        base64: true,
      });

      if (result.canceled) {
        return;
      }

      if (!result.assets[0].base64) {
        // TODO: cover this error
        return;
      }

      const method = !!user?.avatar ? 'update' : 'upload';

      const { data, error } = await supabase.storage
        .from('avatars')
        [method](`${user?.id}/avatar.png`, decode(result.assets[0].base64), {
          contentType: 'image/png',
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(data.path);

      await mutateUserAsync({ avatar: publicUrl });

      setAvatarImageUri(result.assets[0].uri);
    } catch (err) {
      console.log({ err });
    }
  };

  const onPressContinue = async () => {
    try {
      await mutateUserAsync({
        display_name: displayName,
        color: selectedColor,
      });

      if (!isTab) {
        navigate('No Race');
      }
    } catch (err) {
      console.log({ err });
      // TODO: handle this error
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader hideBackButton={isTab}>Profile</ScreenHeader>
      <Spacer height={12} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <Spacer height={12} />
          {!isTab && (
            <Text style={styles.subheader}>
              Looks like you&apos;re new around here. {'\n'}Lets get you set up!
            </Text>
          )}
          <Spacer height={36} />
          <View>
            <View
              style={[styles.avatarOuterBorder, { borderColor: selectedColor }]}
            >
              {avatarImageUri ? (
                <Image
                  source={avatarImageUri}
                  style={{ width: 164, height: 164 }}
                  cachePolicy="none"
                />
              ) : (
                <AvatarPlaceholderSvg />
              )}
            </View>
            <Pressable style={styles.addImageButton} onPress={onPressAddImage}>
              <ImageUploadIconSvg />
            </Pressable>
          </View>
        </View>
        <Spacer height={40} />
        <View style={{ width: '100%' }}>
          <Heading style={{ marginLeft: 24 }}>COLOUR</Heading>
          <Spacer height={12} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignSelf: 'center',
            }}
          >
            {choosableColors.map((color) => (
              <Fragment key={color}>
                <Pressable
                  style={{
                    backgroundColor:
                      selectedColor === color ? '#fff' : 'transparent',
                    borderRadius: 30,
                    padding: 2,
                  }}
                  onPress={() => setSelectedColor(color)}
                >
                  <View style={styles.colorContainer}>
                    <View
                      key={color}
                      style={[styles.color, { backgroundColor: color }]}
                    />
                  </View>
                </Pressable>
                <View style={{ width: 4 }} />
              </Fragment>
            ))}
            <View style={{ width: 32 }}></View>
          </ScrollView>
          <Spacer height={24} />
          <View style={{ marginHorizontal: 20 }}>
            <Heading style={{ marginLeft: 4 }}>DISPLAY NAME</Heading>
            <Spacer height={12} />
            <Input onChangeText={setDisplayName} value={displayName} />
          </View>
        </View>
        <Spacer height={40} />
        <View style={[styles.stickyButtonContainer]}>
          <PrimaryButton
            disabled={!displayName || !user?.avatar}
            onPress={onPressContinue}
          >
            {isTab ? 'Save changes' : 'Continue'}
          </PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  subheader: {
    textAlign: 'center',
  },
  avatarOuterBorder: {
    borderRadius: 164 + 8 / 2,
    overflow: 'hidden',
    borderWidth: 8,
  },
  addImageButton: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.pictonBlue,
    right: 0,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContainer: {
    padding: 4,
    borderRadius: 30,
    backgroundColor: Colors.squidInkNavy,
  },
  color: {
    height: 44,
    width: 44,
    borderRadius: 30,
  },
  stickyButtonContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
});
