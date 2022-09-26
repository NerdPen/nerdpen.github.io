export declare global {
    interface Window {
        PaymentSDK: IPaymentSDK;
    }
}
interface IPaymentSDK {
    setupSDK: (appId: string, appKey: string, serverType: ServerType) => void;
    card: CreditCard;
    ccv: CCV;
}

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
    get iframeDomain(): string;
}

export declare type EventHandler<T> = (args: T) => void;
export declare class EventEmitter {
    private listeners;
    constructor();
    protected on<T>(event: string, callback: EventHandler<T>): void;
    protected emit<T>(event: string, payload?: T): void;
    protected off(event: string): void;
}

export declare type EventHandler<T> = (args: T) => void;
export declare class PostMessageEmitter {
    current: Window;
    target: Window;
    origin: string;
    private listeners;
    constructor(current: Window, target: Window, origin: string);
    protected on<T>(event: string, callback: EventHandler<T>): void;
    emit<T>(event: string, payload?: T): void;
    protected registerEvent<T>(event: string): (handler: EventHandler<PostMessage<T>>) => void;
}

export declare type ServerType = 'sandbox' | 'production';
export declare type Origin = {
    [key in ServerType]: string;
};
export declare type ClientData = {
    appId: number | string;
    appKey: string;
    serverType: ServerType;
};
export declare type PostMessage<T> = {
    type: string;
    payload: T;
};

export declare class CCV extends EventEmitter {
    constructor();
    setup(config: ICreditCardSetup): void;
    private createFields;
    private getParentElement;
    setupCardBrand(cardBrand: CardBrand): void;
    onUpdate(callback: (result: ICreditCardUpdateData) => void): void;
    getTxnLastToken(callback: (result: IGetTxnLastTokenResponseEntity) => void): void;
}

interface ICreditCard {
    setup: (config: ICreditCardSetup) => void;
    getTxnToken: (callback: (result: IGetTxnTokenResponseEntity) => void) => void;
}
export declare class CreditCard extends EventEmitter implements ICreditCard {
    constructor();
    setup(config: ICreditCardSetup): void;
    private createFields;
    private getParentElement;
    private focusToNextField;
    private getFieldData;
    getTxnToken(callback: (result: IGetTxnTokenResponseEntity) => void): void;
    onUpdate(callback: (result: ICreditCardUpdateData) => void): void;
}

export declare enum CardBrand {
    Unknown = "Unknown",
    MasterCard = "MasterCard",
    VISA = "VISA",
    JCB = "JCB",
    AMEX = "AMEX",
    UnionPay = "UnionPay"
}

export declare type AllowedCardBrand = keyof typeof CardBrand;
export declare type AllowedStyleTypes = Lowercase<keyof typeof FieldStatus | 'focus'>;
export declare type AllowedCSSStyles = Partial<Pick<CSSStyleDeclaration, 'width' | 'height' | 'borderColor' | 'color'>>;
export declare type FieldsConfig = {
    [key in FieldsType]?: {
        element: string | HTMLElement;
        placeholder?: string;
    };
};
export declare type FieldsStylesConfig = {
    [key in Exclude<AllowedStyleTypes, 'normal'>]?: Pick<AllowedCSSStyles, 'color' | 'borderColor'>;
} & {
    normal?: AllowedCSSStyles;
};
export interface ICreditCardSetup {
    fields: FieldsConfig;
    styles?: FieldsStylesConfig;
}
export interface ICreditCardData {
    canGetToken: boolean;
    cardBrand: CardBrand;
    fields: {
        [key in FieldsType]?: {
            target: FieldFrame;
            status: FieldStatus;
            value: string;
            errorMessage?: string;
        };
    };
}
export interface ICreditCardUpdateData extends Omit<ICreditCardData, 'fields'> {
    fields: {
        [key in FieldsType]?: {
            status: FieldStatus;
            errorMessage?: string;
        };
    };
}

export declare const getCardBrand: (value: string) => CardBrand;
export declare const getCardNumberMaxLength: (cardBrand: CardBrand) => number;
export declare const getCardCCVMaxLength: (cardBrand: CardBrand) => number;
export declare const combineDefaultSetup: (config: ICreditCardSetup) => {
    styles: {
        error?: Pick<Partial<Pick<CSSStyleDeclaration, "width" | "height" | "borderColor" | "color">>, "borderColor" | "color">;
        focus?: Pick<Partial<Pick<CSSStyleDeclaration, "width" | "height" | "borderColor" | "color">>, "borderColor" | "color">;
        success?: Pick<Partial<Pick<CSSStyleDeclaration, "width" | "height" | "borderColor" | "color">>, "borderColor" | "color">;
        normal?: Partial<Pick<CSSStyleDeclaration, "width" | "height" | "borderColor" | "color">>;
    };
    fields: import("@/payments/creditCard/models").FieldsConfig;
};
export declare const convertSetupStylesToCSSRule: (fieldsStyles: FieldsStylesConfig) => string[];

export declare const isFieldsConfigValid: (fields: FieldsConfig) => boolean;
export declare const isSetupCCVFieldsValid: (fields: FieldsConfig) => boolean;
export declare const isSetupStyleTypeValid: (type: AllowedStyleTypes) => boolean;
export declare const isSetupCSSStyleValid: (type: string, cssStyle: keyof AllowedCSSStyles) => boolean;

export declare class FieldFrame extends PostMessageEmitter {
    element: HTMLIFrameElement;
    constructor(element: HTMLIFrameElement);
    onUpdate(callback: (result: IFieldUpdate) => void): void;
    onUpdateCardBrand(callback: (result: CardBrand) => void): void;
    onGetTxnTokenCompleted(callback: (result: IGetTxnTokenResponseEntity) => void): void;
    onGetTxnLastTokenCompleted(callback: (result: IGetTxnLastTokenResponseEntity) => void): void;
}


export declare class BaseField extends PostMessageEmitter {
    params: IFieldTemplateParams;
    private _element;
    private _status;
    private _cardBrand;
    private _errors;
    constructor(params: IFieldTemplateParams);
    private getParentMessage;
    private createStyleSheet;
    protected changeElementStatus(): void;
    private removeNotAllowedCharacter;
    protected getUnformattedValue(): string;
    protected formatValue(): void;
    protected afterValueFormated(): void;
    protected validate(): void;
    private onBlur;
    private onChange;
    protected get element(): HTMLInputElement;
    protected set status(status: number);
    protected get status(): number;
    protected get cardBrand(): CardBrand;
    protected set cardBrand(brand: CardBrand);
    protected set errors(errors: string[]);
    protected get errors(): string[];
}

export declare class CCVField extends BaseField {
    params: IFieldTemplateParams;
    constructor(params: IFieldTemplateParams);
    protected validate(): void;
    protected afterValueFormated(): void;
}

export declare class ExpirationDateField extends BaseField {
    params: IFieldTemplateParams;
    constructor(params: IFieldTemplateParams);
    protected validate(): void;
    private getDiffMonths;
    protected formatValue(): void;
    protected afterValueFormated(): void;
}

export declare class NumberField extends BaseField {
    params: IFieldTemplateParams;
    constructor(params: IFieldTemplateParams);
    protected validate(): void;
    protected formatValue(): void;
    protected afterValueFormated(): void;
}

export declare enum FieldStatus {
    Normal = 0,
    Success = 1,
    Error = -1
}

export declare type FieldsType = 'number' | 'expirationDate' | 'ccv';
export interface IFieldTemplateParams {
    type: FieldsType;
    placeholder?: string;
    styles?: FieldsStylesConfig;
}
export interface IFieldUpdate {
    type: FieldsType;
    status: FieldStatus;
    value: string;
    errorMessage: string;
}

export interface IGetTxnTokenRequestEntity extends IApiRequestEntity {
    cardNumber: string;
    cardExpiryDate: string;
    cardSecurityCode: string;
}
export interface IGetTxnTokenResponseEntity extends IApiResponseEntity {
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
export interface IGetTxnLastTokenRequestEntity extends IApiRequestEntity {
    cardBrand: CardBrand;
    cardSecurityCode: string;
}
export interface IGetTxnLastTokenResponseEntity extends IApiResponseEntity {
    txnLastToken: string;
}
export declare const getTxnLastToken: (data: IGetTxnLastTokenRequestEntity) => Promise<IGetTxnTokenResponseEntity>;

export interface IApiRequestEntity {
    appId: string;
    appKey: string;
    sdkVer: string;
}
export interface IApiResponseEntity {
    statusCode: string;
    message: string;
    clinetIP: string;
}