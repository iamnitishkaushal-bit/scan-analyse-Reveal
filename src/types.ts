export interface Ingredient {
  name: string;
  rating: "Good" | "Okay" | "Bad";
  description: string;
}

export interface Claim {
  claim: string;
  reality: "True" | "Partially True" | "False";
  explanation: string;
}

export interface BetterAlternative {
  name: string;
  score: number;
  description: string;
}

export interface RealityReaction {
  expectationImage: string;
  expectationTitle: string;
  realityImage: string;
  realityTitle: string;
  commentary: string;
  reactionGif: string; 
  memeHeading: string;
}

export interface ScanReport {
  id: string;
  userId: string;
  productName: string;
  imageUrl?: string;
  ingredientsText: string;
  truthScore: number;
  timestamp: string;
  ingredientsBreakdown: Ingredient[];
  claims: Claim[];
  healthImpacts: string[];
  alternatives: BetterAlternative[];
  reaction: RealityReaction;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  isAnonymous: boolean;
}

export interface UserStats {
  totalScans: number;
  avgTruthScore: number;
  totalConsciousRating: number; // calculated rating count
  redFlagsCaught: number;
}
