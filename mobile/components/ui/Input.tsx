import { cn } from "@/lib/utils";
import { TextInput, type TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  ...rest
}: Props) {
  return (
    <View className="mb-4">
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className={cn("bg-gray-100 p-4 rounded-2xl text-base")}
        {...rest}
      />
    </View>
  );
}
