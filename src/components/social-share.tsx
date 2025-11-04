import { SocialIcon } from "react-social-icons";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const networks = [
    "facebook",
    "twitter",
    "linkedin",
    "reddit",
    "email",
    "telegram",
    "whatsapp",
  ];

  return (
    <div className="flex items-center gap-2">
      <p className="text-lg font-semibold">Share on:</p>
      <div className="flex items-center gap-2">
        {networks.map((network) => (
          <SocialIcon
            key={network}
            network={network}
            url={url}
            style={{ height: 32, width: 32 }}
            className="hover:scale-110 transition-transform"
          />
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
