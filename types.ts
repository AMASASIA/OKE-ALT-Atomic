import { BrowserProvider, Signer } from "ethers";

export interface Item {
  id: string;
  image: string;
  name: string;
  description: string;
  transcript: string;
  tokenId: number;
  contractAddress: string;
  isSbt: boolean;
  external_url: string;
}

export interface Web3State {
    address: string | null;
    chainId: number | null;
    provider: BrowserProvider | null;
    signer: Signer | null;
}

// This type defines the full state of the creator component
// that needs to be persisted to survive a page reload.
export interface CreatorState {
    file: File | null;
    transcript: string;
    optionsChecked: boolean;
}

export interface AppState {
    view: View;
    web3State: Web3State;
    email: string | null;
    items: Item[];
    isLoadingCollection: boolean;
    selectedItem: Item | null;
    creatorState: CreatorState; // Centralized state for the creator page
    mintingStatus: { message: string; type: 'info' | 'error' | 'success' } | null;
    networkError: string | null;
    mintingData: {
        isOpen: boolean;
        file: File | null;
        transcript: string;
        email: string | null;
        web3State: Web3State;
    };
    isConnectionChoiceModalOpen: boolean;
    isShareModalOpen: boolean;
    isCrossChainModalOpen: boolean;
    itemToTransfer: Item | null;
}

export type View = 'home' | 'collection' | 'creator' | 'detail' | 'midori_card';


export type AppAction =
    | { type: 'SET_VIEW'; payload: View }
    | { type: 'SET_VIEW_AND_EMAIL', payload: { view: View, email: string }}
    | { type: 'SET_WEB3_STATE'; payload: Web3State }
    | { type: 'SET_NETWORK_ERROR'; payload: string | null }
    | { type: 'SET_SELECTED_ITEM', payload: Item }
    | { type: 'UPDATE_CREATOR_STATE', payload: Partial<CreatorState> }
    | { type: 'FETCH_ITEMS_START' }
    | { type: 'FETCH_ITEMS_SUCCESS', payload: Item[] }
    | { type: 'FETCH_ITEMS_FAILURE' }
    | { type: 'CLEAR_MINT_INTENT' }
    | { type: 'START_MINT', payload?: CreatorState } // Enhanced to handle resume flow
    | { type: 'CLOSE_MINT_MODAL' }
    | { type: 'MINT_SUCCESS', payload: { isEmailMint: boolean } }
    | { type: 'CLEAR_STATE_FOR_VIEW_CHANGE' }
    | { type: 'OPEN_CONNECTION_CHOICE_MODAL' }
    | { type: 'CLOSE_CONNECTION_CHOICE_MODAL' }
    | { type: 'OPEN_SHARE_MODAL' }
    | { type: 'CLOSE_SHARE_MODAL' }
    | { type: 'OPEN_CROSS_CHAIN_MODAL', payload: Item }
    | { type: 'CLOSE_CROSS_CHAIN_MODAL' };