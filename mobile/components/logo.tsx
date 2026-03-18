import { Image } from "react-native";
import type { ImageProps } from "react-native";

const logoSource = require("../assets/images/logo.png");
const resolvedLogo = Image.resolveAssetSource(logoSource);
const logoAspectRatio =
  resolvedLogo?.width && resolvedLogo?.height ? resolvedLogo.width / resolvedLogo.height : 1;

export type LogoProps = Omit<ImageProps, "source"> & {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

export function Logo({
  size = 120,
  width,
  height,
  className,
  resizeMode = "contain",
  style,
  accessibilityLabel = "App logo",
  ...props
}: LogoProps) {
  const finalWidth = width ?? (height ? height * logoAspectRatio : size);
  const finalHeight = height ?? finalWidth / logoAspectRatio;

  return (
    <Image
      {...(props as any)}
      {...({ className } as any)}
      source={logoSource}
      resizeMode={resizeMode}
      accessibilityLabel={accessibilityLabel}
      style={[{ width: finalWidth, height: finalHeight }, style]}
    />
  );
}
