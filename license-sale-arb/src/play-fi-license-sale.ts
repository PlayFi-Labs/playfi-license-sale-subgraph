import {
  CommissionPaid,
  ContractInitialized,
  EarlyAccessLicensesClaimed,
  EarlyAccessSaleStatusSet,
  FriendsFamilyLicensesClaimed,
  FriendsFamilySaleStatusSet,
  PartnerLicensesClaimed,
  PartnerSaleStatusSet,
  PartnerTierSet,
  PublicLicensesClaimed,
  PublicSaleStatusSet,
  PublicWhitelistLicensesClaimed,
  PublicWhitelistSaleStatusSet,
  ReferralUpdated,
  TeamLicensesClaimed,
  TeamSaleStatusSet,
  TierSet,
  WhitelistTierSet
} from "../generated/PlayFiLicenseSale/PlayFiLicenseSale"
import {Account, Claim, Phase, Referral, ReferralOwner, Stat, Tier} from "../generated/schema"
import {Address, BigInt, Bytes, ByteArray, log, store} from "@graphprotocol/graph-ts";

export function handleContractInitialized(event: ContractInitialized): void {
  //Initialize stats
  let stat = new Stat(BigInt.zero().toString());
  stat.totalClaims = BigInt.zero();
  stat.totalProceeds = BigInt.zero();
  stat.publicClaims = BigInt.zero();
  stat.publicProceeds = BigInt.zero();
  stat.save()

  //Set team phase paused
  let teamPhase = new Phase('team');
  teamPhase.name = 'team';
  teamPhase.active = false;
  teamPhase.save();

  //Set friends and family phase paused
  let friendsFamilyPhase = new Phase('friends_family');
  friendsFamilyPhase.name = 'friends_family';

  friendsFamilyPhase.active = false;
  friendsFamilyPhase.save();

  //Set early access phase paused
  let earlyAccessPhase = new Phase('early_access');
  earlyAccessPhase.name = 'early_access';
  earlyAccessPhase.active = false;
  earlyAccessPhase.save();

  //Set public phase paused
  let publicPhase = new Phase('public');
  publicPhase.name = 'public';
  publicPhase.active = false;
  publicPhase.save();

  //Set whitelist phase paused
  let whitelistPhase = new Phase('whitelist');
  whitelistPhase.name = 'whitelist';
  whitelistPhase.active = false;
  whitelistPhase.save();
}

export function handleTeamSaleStatusSet(event: TeamSaleStatusSet): void {
  let teamPhase = Phase.load('team');
  teamPhase!.active = event.params.status;
  teamPhase!.save();
}

export function handleFriendsFamilySaleStatusSet(event: FriendsFamilySaleStatusSet): void {
  let friendsFamilyPhase = Phase.load('friends_family');
  friendsFamilyPhase!.active = event.params.status;
  friendsFamilyPhase!.save();
}

export function handleEarlyAccessSaleStatusSet(event: EarlyAccessSaleStatusSet): void {
  let earlyAccessPhase = Phase.load('early_access');
  earlyAccessPhase!.active = event.params.status;
  earlyAccessPhase!.save();
}

export function handlePartnerSaleStatusSet(event: PartnerSaleStatusSet): void {
  let partnerPhase = Phase.load('partner_'+event.params.partnerCode);
  if(!partnerPhase) {
    partnerPhase = new Phase('partner_'+event.params.partnerCode);
    partnerPhase.name = 'partner_'+event.params.partnerCode;
  }
  partnerPhase.active = event.params.status;
  partnerPhase.save();
}

export function handlePublicSaleStatusSet(event: PublicSaleStatusSet): void {
  let publicPhase = Phase.load('public');
  publicPhase!.active = event.params.status;
  publicPhase!.save();
}

export function handlePublicWhitelistSaleStatusSet(event: PublicWhitelistSaleStatusSet): void {
  let publicWhitelistPhase = Phase.load('whitelist');
  publicWhitelistPhase!.active = event.params.status;
  publicWhitelistPhase!.save();
}

export function handleReferralUpdated(event: ReferralUpdated): void {
  let referral = Referral.load(event.params.receiver.toHexString());
  if(!referral) {
    referral = new Referral(event.params.receiver.toHexString());
    referral.activeSince = event.block.timestamp;
    referral.totalCommission = BigInt.zero();
    referral.totalUsed = BigInt.zero();
  } else {
    if(referral.code != event.params.code) {
      if(store.get("ReferralOwner",referral.code)) {
        store.remove("ReferralOwner",referral.code);
      }
    }
  }
  let referralOwner = new ReferralOwner(event.params.code);
  referralOwner.recipient = event.params.receiver;
  referralOwner.save();
  referral.code = event.params.code;
  referral.recipient = event.params.receiver;
  referral.save();
}

export function handleTierSet(event: TierSet): void {
  let tier = Tier.load('public_'+event.params.tierId.toString());
  if(!tier) {
    tier = new Tier('public_'+event.params.tierId.toString());
    tier.type = 'public';
    tier.number = event.params.tierId;
    tier.claimed = BigInt.zero();
  }
  tier.totalCap = event.params.totalCap
  tier.individualCap = event.params.individualCap;
  tier.price = event.params.price;
  tier.save();
}

export function handleWhitelistTierSet(event: WhitelistTierSet): void {
  let tier = Tier.load('whitelist_'+event.params.tierId.toString());
  if(!tier) {
    tier = new Tier('whitelist_'+event.params.tierId.toString());
    tier.type = 'whitelist';
    tier.number = event.params.tierId;
    tier.claimed = BigInt.zero();
  }
  tier.totalCap = event.params.totalCap
  tier.individualCap = event.params.individualCap;
  tier.price = event.params.price;
  tier.save();
}

export function handlePartnerTierSet(event: PartnerTierSet): void {
  let tier = Tier.load('partner_'+event.params.partnerCode+'_'+event.params.tierId.toString());
  if(!tier) {
    tier = new Tier('partner_'+event.params.partnerCode+'_'+event.params.tierId.toString());
    tier.type = 'partner_'+event.params.partnerCode;
    tier.number = event.params.tierId;
    tier.claimed = BigInt.zero();
  }
  tier.totalCap = event.params.totalCap
  tier.individualCap = event.params.individualCap;
  tier.price = event.params.price;
  tier.save();
}

export function handleCommissionPaid(event: CommissionPaid): void {
  let referral = Referral.load(event.params.receiver.toHexString());
  if(referral) {
    referral.totalUsed = referral.totalUsed.plus(BigInt.fromI32(1));
    referral.totalCommission = referral.totalCommission.plus(event.params.amount);
    referral.save();
  }
}

export function handlePublicLicensesClaimed(event: PublicLicensesClaimed): void {
  let account = Account.load(event.params.account.toHexString());
  if(!account) {
    account = new Account(event.params.account.toHexString());
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  claim.tier = 'public_'+event.params.tier.toString();
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = 'public';
  let referralOwner = ReferralOwner.load(event.params.referral);
  if(referralOwner) {
    claim.referral = referralOwner.recipient.toHexString();
  }
  claim.save();

  let tier = Tier.load('public_'+event.params.tier.toString());
  tier!.claimed = tier!.claimed.plus(claim.amount);
  tier!.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.publicClaims = stat!.publicClaims.plus(claim.amount);
  stat!.publicProceeds = stat!.publicProceeds.plus(claim.paid);
  stat!.save();
}

export function handlePublicWhitelistLicensesClaimed(event: PublicWhitelistLicensesClaimed): void {
  let account = Account.load(event.params.account.toHexString());
  if(!account) {
    account = new Account(event.params.account.toHexString());
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  claim.tier = 'whitelist_'+event.params.tier.toString();
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = 'public';
  let referralOwner = ReferralOwner.load(event.params.referral);
  if(referralOwner) {
    claim.referral = referralOwner.recipient.toHexString();
  }
  claim.save();

  let tier = Tier.load('whitelist_'+event.params.tier.toString());
  tier!.claimed = tier!.claimed.plus(claim.amount);
  tier!.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.publicClaims = stat!.publicClaims.plus(claim.amount);
  stat!.publicProceeds = stat!.publicProceeds.plus(claim.paid);
  stat!.save();
}

export function handlePartnerLicensesClaimed(event: PartnerLicensesClaimed): void {
  let account = Account.load(event.params.account.toHexString());
  if(!account) {
    account = new Account(event.params.account.toHexString());
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  claim.tier = 'partner_'+event.params.partnerCode+'_'+event.params.tier.toString();
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = 'partner_'+event.params.partnerCode;
  let referralOwner = ReferralOwner.load(event.params.referral);
  if(referralOwner) {
    claim.referral = referralOwner.recipient.toHexString();
  }
  claim.save();

  let tier = Tier.load('partner_'+event.params.partnerCode+'_'+event.params.tier.toString());
  tier!.claimed = tier!.claimed.plus(claim.amount);
  tier!.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handleEarlyAccessLicensesClaimed(event: EarlyAccessLicensesClaimed): void {
  let account = Account.load(event.params.account.toHexString());
  if(!account) {
    account = new Account(event.params.account.toHexString());
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = 'early_access';
  claim.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handleFriendsFamilyLicensesClaimed(event: FriendsFamilyLicensesClaimed): void {
  let account = Account.load(event.params.account.toHexString());
  if(!account) {
    account = new Account(event.params.account.toHexString());
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = 'friends_family';
  claim.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handleTeamLicensesClaimed(event: TeamLicensesClaimed): void {
  let account = Account.load(event.params.account.toHexString());
  if(!account) {
    account = new Account(event.params.account.toHexString());
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.save();

  let claim = new Claim(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = BigInt.zero();
  claim.phase = 'team';
  claim.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.save();
}

//helpers

