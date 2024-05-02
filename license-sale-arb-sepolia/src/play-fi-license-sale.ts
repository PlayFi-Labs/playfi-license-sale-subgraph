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
import {BigInt, Bytes} from "@graphprotocol/graph-ts";

export function handleContractInitialized(event: ContractInitialized): void {
  //Initialize stats
  let stat = new Stat(Bytes.fromI32(0));
  stat.totalClaims = BigInt.zero();
  stat.totalProceeds = BigInt.zero();
  stat.save()

  //Set team phase paused
  let teamPhase = new Phase(Bytes.fromI32(0));
  teamPhase.name = 'team';
  teamPhase.active = false;
  teamPhase.save();

  //Set friends and family phase paused
  let friendsFamilyPhase = new Phase(Bytes.fromI32(1));
  friendsFamilyPhase.name = 'friends_family';
  friendsFamilyPhase.active = false;
  friendsFamilyPhase.save();

  //Set early access phase paused
  let earlyAccessPhase = new Phase(Bytes.fromI32(2));
  earlyAccessPhase.name = 'early_access';
  earlyAccessPhase.active = false;
  earlyAccessPhase.save();

  //Set partner phase paused
  let partnerPhase = new Phase(Bytes.fromI32(3));
  partnerPhase.name = 'partner';
  partnerPhase.active = false;
  partnerPhase.save();

  //Set public phase paused
  let publicPhase = new Phase(Bytes.fromI32(4));
  publicPhase.name = 'public';
  publicPhase.active = false;
  publicPhase.save();
}

export function handleTeamSaleStatusSet(event: TeamSaleStatusSet): void {
  let teamPhase = Phase.load(Bytes.fromI32(0));
  teamPhase!.active = event.params.status;
  teamPhase!.save();
}

export function handleFriendsFamilySaleStatusSet(event: FriendsFamilySaleStatusSet): void {
  let friendsFamilyPhase = Phase.load(Bytes.fromI32(1));
  friendsFamilyPhase!.active = event.params.status;
  friendsFamilyPhase!.save();
}

export function handleEarlyAccessSaleStatusSet(event: EarlyAccessSaleStatusSet): void {
  let earlyAccessPhase = Phase.load(Bytes.fromI32(2));
  earlyAccessPhase!.active = event.params.status;
  earlyAccessPhase!.save();
}

export function handlePartnerSaleStatusSet(event: PartnerSaleStatusSet): void {
  let partnerPhase = Phase.load(Bytes.fromI32(3));
  partnerPhase!.active = event.params.status;
  partnerPhase!.save();
}

export function handlePublicSaleStatusSet(event: PublicSaleStatusSet): void {
  let publicPhase = Phase.load(Bytes.fromI32(4));
  publicPhase!.active = event.params.status;
  publicPhase!.save();
}

export function handleReferralUpdated(event: ReferralUpdated): void {
  let referral = Referral.load(Bytes.fromHexString(event.params.code));
  if(!referral) {
    referral = new Referral(Bytes.fromHexString(event.params.code));
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
  let tier = Tier.load(Bytes.fromI32(event.params.tierId.toI32()));
  if(!tier) {
    tier = new Tier(Bytes.fromI32(event.params.tierId.toI32()));
    tier.claimed = BigInt.zero();
  }
  tier.totalCap = event.params.totalCap
  tier.individualCap = event.params.individualCap;
  tier.price = event.params.price;
  tier.save();
}

export function handleCommissionPaid(event: CommissionPaid): void {
  let referral = Referral.load(Bytes.fromHexString(event.params.code));
  referral!.totalUsed = referral!.totalUsed.plus(BigInt.fromI32(1));
  referral!.totalCommission = referral!.totalCommission.plus(event.params.amount);
  referral!.save();
}

export function handlePublicLicensesClaimed(event: PublicLicensesClaimed): void {
  let account = Account.load(Bytes.fromHexString(event.params.account.toHexString()));
  if(!account) {
    account = new Account(Bytes.fromHexString(event.params.account.toHexString()));
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.concatI32(event.logIndex.toI32()));
  claim.tier = Bytes.fromI32(event.params.tier.toI32());
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = Bytes.fromI32(4);
  claim.referral = Bytes.fromHexString(event.params.referral)
  claim.save();

  let tier = Tier.load(Bytes.fromI32(event.params.tier.toI32()));
  tier!.claimed = tier!.claimed.plus(claim.amount);
  tier!.save();

  let stat = Stat.load(Bytes.fromI32(0));
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handlePartnerLicensesClaimed(event: PartnerLicensesClaimed): void {
  let account = Account.load(Bytes.fromHexString(event.params.account.toHexString()));
  if(!account) {
    account = new Account(Bytes.fromHexString(event.params.account.toHexString()));
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.concatI32(event.logIndex.toI32()));
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = Bytes.fromI32(3);
  claim.save();

  let stat = Stat.load(Bytes.fromI32(0));
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handleEarlyAccessLicensesClaimed(event: EarlyAccessLicensesClaimed): void {
  let account = Account.load(Bytes.fromHexString(event.params.account.toHexString()));
  if(!account) {
    account = new Account(Bytes.fromHexString(event.params.account.toHexString()));
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.concatI32(event.logIndex.toI32()));
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = Bytes.fromI32(2);
  claim.save();

  let stat = Stat.load(Bytes.fromI32(0));
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handleFriendsFamilyLicensesClaimed(event: FriendsFamilyLicensesClaimed): void {
  let account = Account.load(Bytes.fromHexString(event.params.account.toHexString()));
  if(!account) {
    account = new Account(Bytes.fromHexString(event.params.account.toHexString()));
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.totalPaid = account.totalPaid.plus(event.params.paid);
  account.save();

  let claim = new Claim(event.transaction.hash.concatI32(event.logIndex.toI32()));
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = event.params.paid;
  claim.phase = Bytes.fromI32(1);
  claim.save();

  let stat = Stat.load(Bytes.fromI32(0));
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.totalProceeds = stat!.totalProceeds.plus(claim.paid);
  stat!.save();
}

export function handleTeamLicensesClaimed(event: TeamLicensesClaimed): void {
  let account = Account.load(Bytes.fromHexString(event.params.account.toHexString()));
  if(!account) {
    account = new Account(Bytes.fromHexString(event.params.account.toHexString()));
    account.totalLicenses = BigInt.zero();
    account.totalPaid = BigInt.zero();
  }
  account.totalLicenses = account.totalLicenses.plus(event.params.amount);
  account.save();

  let claim = new Claim(event.transaction.hash.concatI32(event.logIndex.toI32()));
  claim.account = account.id;
  claim.amount = event.params.amount;
  claim.paid = BigInt.zero();
  claim.phase = Bytes.fromI32(0);
  claim.save();

  let stat = Stat.load(Bytes.fromI32(0));
  stat!.totalClaims = stat!.totalClaims.plus(claim.amount);
  stat!.save();
}

