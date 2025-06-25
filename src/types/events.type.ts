// Enums
enum VoteCurrency {
  USDC = 0,
  TLNT = 1,
  // Add other currencies as needed
}

enum ShowState {
  CREATED = 0,
  ACTIVE = 1,
  ENTRY_CLOSED = 2,
  VOTING_ACTIVE = 3,
  VOTING_CLOSED = 4,
  COMPLETED = 5,
  CANCELLED = 6,
  // Adjust based on your actual state values
}

// Vote struct (referenced in ShowDataResponse)
interface Vote {
  fid: bigint;
  voter_address: string;
  selected_entry_id: string;
  vote_currency: VoteCurrency;
  refunded: boolean;
}

// Main type for the ShowDataResponse struct
export interface ShowData {
  participants: string[]; // address[]
  submissions: string[]; // string[]
  votes: Vote[]; // LibTalentDiamond.Vote[]
  state: ShowState; // LibTalentDiamond.ShowState
  prize_pool_usdc: bigint; // uint256
  start_time: bigint; // uint256
  entry_closed_time: bigint; // uint256
  voting_closed_time: bigint; // uint256
  name: string;
  description: string;
  tags: string;
  voters: string[]; // address[]
}
export interface TalentBaseStorage {
  TALENT_TOKEN: string;
  USDC_TOKEN: string;
  WETH: string;
  swaprouter: string;
  quoter: string;
  max_slippage: bigint;
  usdc_pool_fee: number;
  talent_pool_fee: number;
  token_entry_price: bigint;
  vote_reward: bigint;
  vote_price: bigint;
  winner_percentage: bigint;
  second_percentage: bigint;
  third_percentage: bigint;
  show_percentage: bigint;
}
