import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useLogoutMutation } from '@/lib/hooks/auth/use-logout-mutation';

import { DRAWER_LINKS } from './config';
import { styles } from './styles';

type DrawerLinkButtonProps = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

function DrawerLinkButton({ label, onPress, destructive = false }: DrawerLinkButtonProps) {
  return (
    <Pressable style={styles.drawerLink} onPress={onPress}>
      <Text style={destructive ? styles.logoutText : undefined}>{label}</Text>
    </Pressable>
  );
}

export function CustomDrawerContent() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.replace('/login');
  };

  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerHeading}>Welcome</Text>
      {DRAWER_LINKS.map((link) => (
        <DrawerLinkButton key={link.href} label={link.label} onPress={() => router.push(link.href)} />
      ))}
      <DrawerLinkButton label="Logout" onPress={handleLogout} destructive />
    </View>
  );
}
