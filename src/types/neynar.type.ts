type UserDehydrated = {
  object: "user_dehydrated";
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  custody_address: string;
};

type MentionedProfileRange = {
  start: number;
  end: number;
};

type ChannelViewerContext = {
  following: boolean;
  role: string;
};

type MentionedChannel = {
  id: string;
  name: string;
  object: "channel_dehydrated";
  image_url: string;
  viewer_context: ChannelViewerContext;
};

type MentionedChannelRange = {
  start: number;
  end: number;
};

type Bio = {
  text: string;
  mentioned_profiles: UserDehydrated[];
  mentioned_profiles_ranges: MentionedProfileRange[];
  mentioned_channels: MentionedChannel[];
  mentioned_channels_ranges: MentionedChannelRange[];
};

type Address = {
  city: string;
  state: string;
  state_code: string;
  country: string;
  country_code: string;
};

type Location = {
  latitude: number;
  longitude: number;
  address: Address;
  radius: number;
};

type Banner = {
  url: string;
};

type Profile = {
  bio: Bio;
  location: Location;
  banner: Banner;
};

type ProStatus = {
  status: "subscribed" | string;
  subscribed_at: string; // ISO date string
  expires_at: string; // ISO date string
};

type VerifiedAddresses = {
  eth_addresses: string[];
  sol_addresses: string[];
  primary: {
    eth_address: string;
    sol_address: string;
  };
};

type VerifiedAccount = {
  platform: string;
  username: string;
};

type Experimental = {
  deprecation_notice: string;
  neynar_user_score: number;
};

type ViewerContext = {
  following: boolean;
  followed_by: boolean;
  blocking: boolean;
  blocked_by: boolean;
};

export type NUser = {
  object: "user";
  fid: number;
  username: string;
  display_name: string;
  custody_address: string;
  pro: ProStatus;
  pfp_url: string;
  profile: Profile;
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: VerifiedAddresses;
  verified_accounts: VerifiedAccount[];
  power_badge: boolean;
  experimental: Experimental;
  viewer_context: ViewerContext;
  score: number;
};
