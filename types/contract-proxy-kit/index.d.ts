// Type definitions for contract-proxy-kit 1.0
// Project: https://github.com/gnosis/contract-proxy-kit#readme
// Definitions by: Alan Lu <https://github.com/cag>
//                 Germán Martínez <https://github.com/germartinez>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.6

import { ethers } from 'ethers';

export namespace CPK {
    interface NetworkConfigEntry {
        masterCopyAddress: string;
        proxyFactoryAddress: string;
        multiSendAddress: string;
        fallbackHandlerAddress: string;
    }

    interface Web3SpecificConfig {
        web3: object;
    }

    interface EthersSpecificConfig {
        ethers: typeof ethers;
        signer: ethers.Signer;
    }

    interface CPKSpecificConfig{
        cpkProvider: object;
    }

    type CPKProviderConfig = Web3SpecificConfig | EthersSpecificConfig | CPKSpecificConfig;

    interface CPKConfig {
        cpkProvider: CPKProviderConfig;
        networks?: {
            [id: string]: NetworkConfigEntry;
        };
        ownerAccount?: string;
    }

    interface Transaction {
        operation?: number | string | object;
        to: string;
        value?: number | string | object;
        data: string;
    }

    type TransactionOptions = object;

    interface TransactionResult {
        hash: string;
        promiEvent?: object;
        transactionResponse?: ethers.providers.TransactionResponse;
    }
}

export class CPK {
    static CALL: 0;
    static DELEGATECALL: 1;

    static create(opts: CPK.CPKConfig): Promise<CPK>;

    getOwnerAccount(): Promise<string>;
    get address(): string;
    execTransactions(
        transactions: ReadonlyArray<CPK.Transaction>,
        options?: CPK.TransactionOptions,
    ): Promise<CPK.TransactionResult>;
}

declare class CPKProvider {
    static getContractAddress(contract: any): string;
    static attemptTransaction(
        contract: any,
        viewContract: any,
        methodName: string,
        params: ReadonlyArray<object>,
        sendOptions: CPK.TransactionOptions,
        err: any
    ): Promise<CPK.TransactionResult>;
    static getSendOptions(options: CPK.TransactionOptions, ownerAccount?: string): object;
    
    init(
        isConnectedToSafe: boolean,
        ownerAccount: string,
        masterCopyAddress: string,
        proxyFactoryAddress: string,
        multiSendAddress: string
    ): object;
    getProvider(): any;
    getNetworkId(): Promise<number>;
    getOwnerAccount(): Promise<string>;
    getCodeAtAddress(contract: any): Promise<string>;
    getContract(abi: ReadonlyArray<object>, address: string): any;
    checkSingleCall(tx: CPK.Transaction): Promise<any>;
    attemptSafeProviderSendTx(
        tx: CPK.Transaction,
        options: CPK.TransactionOptions
    ): Promise<object>;
    attemptSafeProviderMultiSendTxs(transactions: ReadonlyArray<CPK.Transaction>): object;
    encodeMultiSendCallData(transactions: ReadonlyArray<CPK.Transaction>): string;
}

export class CPKWeb3Provider extends CPKProvider {
    constructor(opts: CPK.Web3SpecificConfig);
}

export class CPKEthersProvider extends CPKProvider {
    constructor(opts: CPK.EthersSpecificConfig);
}
