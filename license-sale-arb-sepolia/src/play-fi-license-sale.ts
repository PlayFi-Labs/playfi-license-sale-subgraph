import {
  CommissionPaid,
  ContractInitialized, EarlyAccessLicensesClaimed,
  EarlyAccessSaleStatusSet, FriendsFamilyLicensesClaimed,
  FriendsFamilySaleStatusSet, PartnerLicensesClaimed,
  PartnerSaleStatusSet, PublicLicensesClaimed,
  PublicSaleStatusSet, ReferralUpdated, TeamLicensesClaimed,
  TeamSaleStatusSet, TierSet
} from "../generated/PlayFiLicenseSale/PlayFiLicenseSale"
import {Account, Claim, Phase, Referral, Stat, Tier} from "../generated/schema"
import {Address, BigInt, Bytes, ByteArray, log} from "@graphprotocol/graph-ts";

export function handleContractInitialized(event: ContractInitialized): void {
  //Initialize stats
  let stat = new Stat(BigInt.zero().toString());
  stat.totalClaims = BigInt.zero();
  stat.totalProceeds = BigInt.zero();
  stat.save()

  //Set team phase paused
  let teamPhase = new Phase(BigInt.zero().toString());
  teamPhase.name = 'team';
  teamPhase.active = false;
  teamPhase.save();

  //Set friends and family phase paused
  let friendsFamilyPhase = new Phase(BigInt.fromU32(1).toString());
  friendsFamilyPhase.name = 'friends_family';

  friendsFamilyPhase.active = false;
  friendsFamilyPhase.save();

  //Set early access phase paused
  let earlyAccessPhase = new Phase(BigInt.fromU32(2).toString());
  earlyAccessPhase.name = 'early_access';
  earlyAccessPhase.active = false;
  earlyAccessPhase.save();

  //Set partner phase paused
  let partnerPhase = new Phase(BigInt.fromU32(3).toString());
  partnerPhase.name = 'partner';
  partnerPhase.active = false;
  partnerPhase.save();

  //Set public phase paused
  let publicPhase = new Phase(BigInt.fromU32(4).toString());
  publicPhase.name = 'public';
  publicPhase.active = false;
  publicPhase.save();
}

export function handleTeamSaleStatusSet(event: TeamSaleStatusSet): void {
  let teamPhase = Phase.load(BigInt.zero().toString());
  teamPhase!.active = event.params.status;
  teamPhase!.save();
}

export function handleFriendsFamilySaleStatusSet(event: FriendsFamilySaleStatusSet): void {
  let friendsFamilyPhase = Phase.load(BigInt.fromU32(1).toString());
  friendsFamilyPhase!.active = event.params.status;
  friendsFamilyPhase!.save();
}

export function handleEarlyAccessSaleStatusSet(event: EarlyAccessSaleStatusSet): void {
  let earlyAccessPhase = Phase.load(BigInt.fromU32(2).toString());
  earlyAccessPhase!.active = event.params.status;
  earlyAccessPhase!.save();
}

export function handlePartnerSaleStatusSet(event: PartnerSaleStatusSet): void {
  let partnerPhase = Phase.load(BigInt.fromU32(3).toString());
  partnerPhase!.active = event.params.status;
  partnerPhase!.save();
}

export function handlePublicSaleStatusSet(event: PublicSaleStatusSet): void {
  let publicPhase = Phase.load(BigInt.fromU32(4).toString());
  publicPhase!.active = event.params.status;
  publicPhase!.save();
}

export function handleReferralUpdated(event: ReferralUpdated): void {
  let referral = Referral.load(event.params.code);
  if(!referral) {
    referral = new Referral(event.params.code);
    referral.activeSince = event.block.timestamp;
    referral.totalCommission = BigInt.zero();
    referral.totalUsed = BigInt.zero();
  }
  referral.code = event.params.code;
  referral.commissionPercentage = event.params.commission;
  referral.discountPercentage = event.params.discount;
  referral.recipient = event.params.receiver;
  referral.save();
}

export function handleTierSet(event: TierSet): void {
  let tier = Tier.load(event.params.tierId.toString());
  if(!tier) {
    tier = new Tier(event.params.tierId.toString());
    tier.number = event.params.tierId;
    tier.claimed = BigInt.zero();
  }
  tier.totalCap = event.params.totalCap
  tier.individualCap = event.params.individualCap;
  tier.price = event.params.price;
  tier.save();
}

export function handleCommissionPaid(event: CommissionPaid): void {
  (event.params.code);
  let referral = Referral.load(event.params.code);
  referral!.totalUsed = referral!.totalUsed.plus(BigInt.fromI32(1));
  referral!.totalCommission = referral!.totalCommission.plus(event.params.amount);
  referral!.save();
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
  claim.tier = event.params.tier.toString();
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = BigInt.fromString("4").toString();
  claim.referral = event.params.referral;
  claim.save();

  let tier = Tier.load(event.params.tier.toString());
  tier!.claimed = tier!.claimed.plus(claim.amount);
  tier!.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
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
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = BigInt.fromString("3").toString();
  claim.save();

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
  claim.phase = BigInt.fromString("2").toString()
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
  claim.phase = BigInt.fromString("1").toString();
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
  claim.phase = BigInt.zero().toString()
  claim.save();

  let stat = Stat.load(BigInt.zero().toString());
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.save();
}

//helpers

