export declare global {
    interface Window {
        PaymentSDK: IPaymentSDK;
    }
}
interface IPaymentSDK {
    setup: (appId: number | string, appKey: string, serverType: ServerType) => void;
    card: CreditCard;
}

export declare class ApiFrame extends PostMessageEmitter {
    element: HTMLIFrameElement;
    constructor(element: HTMLIFrameElement);
}


export declare type ClientData = {
    appId: number | string;
    appKey: string;
    serverType: ServerType;
};
export declare class Config extends EventEmitter {
    private static _instance;
    private _origin;
    private _clientData;
    private constructor();
    static getInstance(): Config;
    set clientData(data: ClientData);
    get clientData(): ClientData;
    get version(): string;
    get origin(): string;
    get apiDomain(): string;
}

export declare type EventHandler<T extends any> = (args: T) => void;
export declare type EventBinder<T extends any> = (event: EventHandler<T>) => Listener;
export declare class Listener {
    owner: EventEmitter;
    event: Function;
    callback: Function;
    constructor(owner: EventEmitter, event: Function, callback: Function);
}
export declare class EventEmitter {
    private listeners;
    constructor();
    private addListener;
    protected off(): void;
    protected off(listener: Listener): void;
    protected off(event: Function, callback?: Function): void;
    protected emit<T>(event: EventBinder<T>, payload?: T): void;
    protected registerEvent<T>(): (handler: EventHandler<T>) => Listener;
}

export declare type EventHandler<T extends any> = (args: T) => void;
export declare class PostMessageEmitter {
    target: Window;
    origin: string;
    private listeners;
    constructor(target: Window, origin: string);
    protected on<T>(event: string, callback: EventHandler<T>): void;
    emit<T>(event: string, payload?: T): void;
    protected registerEvent<T>(event: string): (handler: EventHandler<T>) => void;
}

export declare type ServerType = 'sandbox' | 'production';
export interface IPostMessage<T> {
    type: string;
    payload: T;
}
export interface IApiResponse {
    statusCode: string;
    message: string;
}

interface ICreditCard {
    setup: (config: ICreditCardSetup) => void;
    getTxnToken: (callback: (result: IGetTxnTokenResponseEntity) => void) => void;
}
export declare class CreditCard extends EventEmitter implements ICreditCard {
    private setupConfig;
    private creditCardData;
    readonly onUpdate: (handler: (args: ICreditCardUpdate) => void) => import("@/src/events/eventEmitter").Listener;
    constructor();
    setup(config: ICreditCardSetup): void;
    private createFields;
    getTxnToken(callback: (result: IGetTxnTokenResponseEntity) => void): void;
}

export declare enum CardBrand {
    Unknown = "Unknown",
    MasterCard = "MasterCard",
    VISA = "VISA",
    JCB = "JCB",
    AMEX = "AMEX",
    UnionPay = "UnionPay"
}

export declare type FieldsType = 'number' | 'expirationDate' | 'ccv';
export interface ICreditCardSetup {
    fields: {
        [key in FieldsType]?: {
            element: string | HTMLElement;
            placeholder?: string;
        };
    };
    styles?: {
        [key in Lowercase<keyof typeof FieldStatus>]?: Partial<CSSStyleDeclaration>;
    };
}
export interface ICreditCardUpdate {
    canGetToken: boolean;
    cardBrand: CardBrand;
    fields: {
        [key in FieldsType]?: {
            status: FieldStatus;
            value: string;
            errorMessage?: string;
        };
    };
}

export declare const getCardBrand: (value: string) => CardBrand;

export declare class FieldFrame extends PostMessageEmitter {
    element: HTMLIFrameElement;
    onUpdate: (handler: (args: IPostMessage<IFieldUpdate>) => void) => void;
    onUpdateCardBrand: (handler: (args: IPostMessage<CardBrand>) => void) => void;
    constructor(element: HTMLIFrameElement);
}


export declare class BaseField extends PostMessageEmitter {
    params: IFieldTemplateParams;
    private _element;
    private _cardBrand;
    private _status;
    private readonly onSyncCardBrand;
    constructor(params: IFieldTemplateParams);
    private removeUnlegalCharacter;
    protected validate(): void;
    private onFocus;
    private onBlur;
    protected onChange(evt: Event): void;
    get element(): HTMLInputElement;
    set status(status: number);
    get status(): number;
    get cardBrand(): CardBrand;
    set cardBrand(brand: CardBrand);
}

export declare class CCVField extends BaseField {
    params: IFieldTemplateParams;
    constructor(params: IFieldTemplateParams);
    protected validate(): void;
}

export declare class ExpirationDateField extends BaseField {
    params: IFieldTemplateParams;
    constructor(params: IFieldTemplateParams);
    protected validate(): void;
}

export declare class NumberField extends BaseField {
    params: IFieldTemplateParams;
    constructor(params: IFieldTemplateParams);
    protected validate(): void;
    protected onChange(evt: Event): void;
}

export declare enum FieldStatus {
    Normal = 0,
    Success = 1,
    Error = -1
}

export interface IFieldTemplateParams {
    type: FieldsType;
}
export interface IFieldUpdate {
    type: FieldsType;
    status: FieldStatus;
    value: string;
}

export interface IGetTxnTokenRequestEntity {
    appId: string;
    appKey: string;
    sdkVer: string;
    cardNumber: string;
    cardExpiryDate: string;
    cardSecurityCode: string;
}
export interface IGetTxnTokenResponseEntity extends IApiResponse {
    clinetIP: string;
    txnToken: string;
    cardInfo: {
        cardBrand: number;
        cardCode: string;
        countryCode: string;
        firstSix: string;
        issuer: string;
        issuerBankCode: string;
        lastFour: string;
    };
}
export declare const getTxnToken: (data: IGetTxnTokenRequestEntity) => Promise<IGetTxnTokenResponseEntity>;
