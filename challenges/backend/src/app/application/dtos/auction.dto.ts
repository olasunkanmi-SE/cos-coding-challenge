export interface IAuctionResponseDTO {
  items: IAuctionItem[];
}

interface IAuctionItem extends location, auctionTimeStamp, identifiers, auctionBids, vatAndTax {
  id: number;
  label: string;
  endingTime: string;
  state: number;
  allowInstantPurchase: boolean;
  instantPurchasePossibleUntil?: string;
  advertisementHtmlContent?: string;
  instantPurchasePrice?: number;
  startingBidValue: number;
  urlToPickupBuyerDocument?: string;
  paymentProcess: number;
  type: number;
  isTest: boolean;
  displayMinAsk: boolean;
  isLive: boolean;
  isTransportationDisabledManually: boolean;
  pickupInstructions: string;
  preventSellerFactoring: boolean;
  listingSurchargeFeeInvoiceReference?: string;
  uploadMethod: string;
  amIInvolved: boolean;
  biddingAgentValue: string;
  remainingTimeInSeconds: number;
  remainingTimeForInstantPurchaseInSeconds?: null;
  associatedVehicle: associatedVehicle;
  amIHighestBidder: boolean;
  sellerContact?: string;
  rating?: number;
  isTransportationAllowedForRegion: boolean;
  isExternalPaymentAllowed: boolean;
  remainingDaysUntilReauctioning?: number;
  remainingDaysUntilLatePickup?: number;
  latePickupFee?: number;
  isTransportationBookingPossible: boolean;
  isExpressPickupAvailable: boolean;
  pickupPossibleInDays?: number;
  sellerAccount: {
    shouldApplyStandingCosts: boolean;
  };
  amIRegularBuyer: boolean;
  isCrossBorderNetSale: boolean;
  distanceToVehicleInKms: number;
  buyerPurchaseFee: number;
  buyerSuccessFee: number;
  isMinAskReached: boolean;
  transportationTask?: string;
  sellerType: number;
  enforceTransportation: boolean;
  isTransportationAvailable: boolean;
}

interface associatedVehicle {
  id: number;
  ez: string;
  make: string;
  mileageInKm: number;
  model: string;
  vin: string;
  hadAccident: boolean;
  accidentDescription: string;
  category: number;
  doors: number;
  enginePowerInHp: number;
  engineSizeInCcm: number;
  fuelType: number;
  transmission: number;
  upholstery: number;
  ac: number;
  coupling: number;
  headlights: number;
  navigation: number;
  parkingAssistance: number;
  sportPackage: number;
  sunRoof: number;
  vehicleHeater: number;
  huReportExists: boolean;
  lastHu?: null;
  numKeys: number;
  numPreOwners: number;
  vatIdReportable: boolean;
  urlToAttachment1?: string;
  urlToAttachment2?: string;
  urlToAttachment3?: string;
  additionalDamages: string;
  urlToVehicleSummarySheet?: string;
  euroNorm: string;
  dimensionWidthInCm: number;
  dimensionHeightInCm: number;
  dimensionLengthInCm: number;
  unloadedWeightInKg: number;
  numSeats: number;
  isReimportedVehicle: boolean;
  datBaseModelRaw: string;
  uuid: string;
  origin: number;
  dataSource: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  lastServiceInspectionDate?: string;
  lastServiceInspectionMileage?: number;
  isCocDocumentAvailable?: boolean;
  countryOfLastRegistration: string;
  bodyColorCode: number;
  readyToDrive: number;
  readyToDriveDetails: string;
  hasDamages: boolean;
  damagesDescription: string;
  additionalInfo: string;
  dataWarnings: any[];
  serviceHistoryAvailability: number;
  fullServiceHistoryType: number;
  hasMaintenanceBook?: boolean;
  fieldsConfirmationStatus: { [key: string]: any };
  licensePlate?: number;
  urlToMotorSound?: string;
  fuelConsumption: { [key: string]: any };
  co2Emission: { [key: string]: any };
  urlsByLanguageToExpose: { [key: string]: any };
  commercialUsage: any[];
  attachments: any[];
  damages: any[];
  equipmentData: any[];
  equipmentHighlights: any[];
  vehicleImages: vehicleImages[];
  tires: [];
  paintState: [];
  technicalState: [];
}

interface vehicleImages {
  url: string;
  perspective: number;
}

interface location {
  locationAddress: string;
  locationCity: string;
  locationZip: string;
  locationCountryCode: string;
}

interface auctionTimeStamp {
  startedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface identifiers {
  uuid: string;
  _fk_uuid_vehicle: string;
  _fk_uuid_sellerUser: string;
  _fk_uuid_highestBiddingBuyerUser: string;
  _fk_uuid_creatingSellerUser?: string;
}

interface auctionBids {
  minimumRequiredAsk?: number;
  currentHighestBidValue: number;
  numBids: number;
  hotBid: boolean;
  originalMinimumRequiredAsk?: number;
  startingBidValueNet: number;
  minimumRequiredAskNet?: number;
  originalMinimumRequiredAskNet?: number;
  purchasePriceNet: number;
  currentHighestBidValueNet: number;
  highestBidValueAtEndingTimeNet?: number;
  instantPurchasePriceNet?: number;
  lastOfferBySellerNet?: number;
  previousLastOfferBySellerNet?: number;
  counterOfferByBuyerNet?: number;
  previousCounterOfferByBuyerNet?: number;
  renegotiationMidpointValueNet?: number;
}

interface vatAndTax {
  thirdPartyVATDepositTransferReference?: string;
  thirdPartyVATDepositChargeReference?: string;
  additionalTaxType: string;
  additionalTaxValue?: number;
  isVATReportable: boolean;
  thirdPartyAdditionalTaxRefundReference?: string;
  vatAmount: number;
  vatRate: number;
}
