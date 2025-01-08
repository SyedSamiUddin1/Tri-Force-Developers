import { Shield, Smartphone, QrCode, Key, Clock, Lock } from "lucide-react";

const features = [
  {
    name: "Two-Factor Authentication",
    description:
      "Enhanced security with time-based one-time passwords (TOTP) for two-step verification.",
    icon: Shield,
  },
  {
    name: "QR Code Login",
    description:
      "Seamless authentication using QR codes for quick and secure access.",
    icon: QrCode,
  },
  {
    name: "Dynamic OTP",
    description:
      "Time-based OTP generation every 30 seconds for maximum security.",
    icon: Clock,
  },
  {
    name: "Key Management",
    description: "Secure storage and management of authentication keys.",
    icon: Key,
  },
  {
    name: "Mobile Integration",
    description: "Cross-platform support with mobile-first design approach.",
    icon: Smartphone,
  },
  {
    name: "Enterprise Security",
    description: "Built for businesses with advanced security requirements.",
    icon: Lock,
  },
];

export default features;
