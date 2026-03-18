import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

type TabBarShellProps = PropsWithChildren<{
  backgroundColor: string;
  borderColor: string;
  shadowColor: string;
}>;

export function TabBarShell({
  backgroundColor,
  borderColor,
  shadowColor,
  children,
}: TabBarShellProps) {
  return (
    <View
      style={[
        styles.tabBarShell,
        {
          backgroundColor,
          borderColor,
          shadowColor,
        },
      ]}
    >
      {children}
    </View>
  );
}
