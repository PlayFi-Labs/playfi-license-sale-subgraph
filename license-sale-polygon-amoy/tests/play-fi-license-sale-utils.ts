import { newMockEvent } from "matchstick-as"
import {ethereum, Address, BigInt} from "@graphprotocol/graph-ts"
import {
    CommissionPaid,
    ContractInitialized, EarlyAccessLicensesClaimed,
    EarlyAccessSaleStatusSet, FriendsFamilyLicensesClaimed,
    FriendsFamilySaleStatusSet, PartnerLicensesClaimed,
    PartnerSaleStatusSet, PublicLicensesClaimed,
    PublicSaleStatusSet, ReferralUpdated, TeamLicensesClaimed,
    TeamSaleStatusSet, TierSet,
} from "../generated/PlayFiLicenseSale/PlayFiLicenseSale"
import {handlePublicLicensesClaimed} from "../src/play-fi-license-sale";

/*export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}*/

export function createContractInitializedEvent(): ContractInitialized {
  let contractInitializedEvent = changetype<ContractInitialized>(newMockEvent())
  return contractInitializedEvent;
}

export function createTeamSaleStatusSetEvent(status: boolean): TeamSaleStatusSet {
    let teamSaleStatusSetEvent = changetype<TeamSaleStatusSet>(newMockEvent())

    teamSaleStatusSetEvent.parameters = new Array()

    teamSaleStatusSetEvent.parameters.push(
        new ethereum.EventParam(
            "status",
            ethereum.Value.fromBoolean(status)
        )
    )

    return teamSaleStatusSetEvent;
}

export function createFriendsFamilySaleStatusSetEvent(status: boolean): FriendsFamilySaleStatusSet {
    let friendsFamilySaleStatusSetEvent = changetype<FriendsFamilySaleStatusSet>(newMockEvent())

    friendsFamilySaleStatusSetEvent.parameters = new Array()

    friendsFamilySaleStatusSetEvent.parameters.push(
        new ethereum.EventParam(
            "status",
            ethereum.Value.fromBoolean(status)
        )
    )

    return friendsFamilySaleStatusSetEvent;
}

export function createEarlyAccessSaleStatusSetEvent(status: boolean): EarlyAccessSaleStatusSet {
    let earlyAccessSaleStatusSetEvent = changetype<EarlyAccessSaleStatusSet>(newMockEvent())

    earlyAccessSaleStatusSetEvent.parameters = new Array()

    earlyAccessSaleStatusSetEvent.parameters.push(
        new ethereum.EventParam(
            "status",
            ethereum.Value.fromBoolean(status)
        )
    )

    return earlyAccessSaleStatusSetEvent;
}

export function createPartnerSaleStatusSetEvent(status: boolean): PartnerSaleStatusSet {
    let partnerSaleStatusSetEvent = changetype<PartnerSaleStatusSet>(newMockEvent())

    partnerSaleStatusSetEvent.parameters = new Array()

    partnerSaleStatusSetEvent.parameters.push(
        new ethereum.EventParam(
            "status",
            ethereum.Value.fromBoolean(status)
        )
    )

    return partnerSaleStatusSetEvent;
}

export function createPublicSaleStatusSetEvent(status: boolean): PublicSaleStatusSet {
    let publicSaleStatusSetEvent = changetype<PublicSaleStatusSet>(newMockEvent())

    publicSaleStatusSetEvent.parameters = new Array()

    publicSaleStatusSetEvent.parameters.push(
        new ethereum.EventParam(
            "status",
            ethereum.Value.fromBoolean(status)
        )
    )

    return publicSaleStatusSetEvent;
}

export function createReferralUpdatedEvent(code: string, receiver: Address, commission: BigInt, discount: BigInt): ReferralUpdated {
    let referralUpdatedEvent = changetype<ReferralUpdated>(newMockEvent())

    referralUpdatedEvent.parameters = new Array()

    referralUpdatedEvent.parameters.push(
        new ethereum.EventParam(
            "code",
            ethereum.Value.fromString(code)
        )
    )

    referralUpdatedEvent.parameters.push(
        new ethereum.EventParam(
            "receiver",
            ethereum.Value.fromAddress(receiver)
        )
    )

    referralUpdatedEvent.parameters.push(
        new ethereum.EventParam(
            "commission",
            ethereum.Value.fromUnsignedBigInt(commission)
        )
    )

    referralUpdatedEvent.parameters.push(
        new ethereum.EventParam(
            "discount",
            ethereum.Value.fromUnsignedBigInt(discount)
        )
    )

    return referralUpdatedEvent;
}

export function createCommissionPaidEvent(code: string, receiver: Address, amount: BigInt): CommissionPaid {
    let commissionPaidEvent = changetype<CommissionPaid>(newMockEvent())

    commissionPaidEvent.parameters = new Array()

    commissionPaidEvent.parameters.push(
        new ethereum.EventParam(
            "code",
            ethereum.Value.fromString(code)
        )
    )

    commissionPaidEvent.parameters.push(
        new ethereum.EventParam(
            "receiver",
            ethereum.Value.fromAddress(receiver)
        )
    )

    commissionPaidEvent.parameters.push(
        new ethereum.EventParam(
            "amount",
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    )

    return commissionPaidEvent;
}


export function createPublicLicensesClaimedEvent(account: Address, amount: BigInt, tier: BigInt, paid: BigInt, referral: string): PublicLicensesClaimed {
    let publicLicensesClaimedEvent = changetype<PublicLicensesClaimed>(newMockEvent())

    publicLicensesClaimedEvent.parameters = new Array()

    publicLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "account",
            ethereum.Value.fromAddress(account)
        )
    )

    publicLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "amount",
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    )

    publicLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "tier",
            ethereum.Value.fromUnsignedBigInt(tier)
        )
    )

    publicLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "paid",
            ethereum.Value.fromUnsignedBigInt(paid)
        )
    )

    publicLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "referral",
            ethereum.Value.fromString(referral)
        )
    )

    return publicLicensesClaimedEvent;
}

export function createTierSetEvent(tierId: BigInt, price: BigInt, individualCap: BigInt, totalClaimed: BigInt, totalCap: BigInt): TierSet {
    let tierSetEvent = changetype<TierSet>(newMockEvent())

    tierSetEvent.parameters = new Array()

    tierSetEvent.parameters.push(
        new ethereum.EventParam(
            "tierId",
            ethereum.Value.fromUnsignedBigInt(tierId)
        )
    )

    tierSetEvent.parameters.push(
        new ethereum.EventParam(
            "price",
            ethereum.Value.fromUnsignedBigInt(price)
        )
    )

    tierSetEvent.parameters.push(
        new ethereum.EventParam(
            "individualCap",
            ethereum.Value.fromUnsignedBigInt(individualCap)
        )
    )

    tierSetEvent.parameters.push(
        new ethereum.EventParam(
            "totalClaimed",
            ethereum.Value.fromUnsignedBigInt(totalClaimed)
        )
    )

    tierSetEvent.parameters.push(
        new ethereum.EventParam(
            "totalCap",
            ethereum.Value.fromUnsignedBigInt(totalCap)
        )
    )

    return tierSetEvent;
}

export function createPartnerLicensesClaimedEvent(account: Address, paid: BigInt, amount: BigInt): PartnerLicensesClaimed {
    let partnerLicensesClaimedEvent = changetype<PartnerLicensesClaimed>(newMockEvent())

    partnerLicensesClaimedEvent.parameters = new Array()

    partnerLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "account",
            ethereum.Value.fromAddress(account)
        )
    )

    partnerLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "paid",
            ethereum.Value.fromUnsignedBigInt(paid)
        )
    )

    partnerLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "amount",
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    )

    return partnerLicensesClaimedEvent;
}

export function createEarlyAccessLicensesClaimedEvent(account: Address, paid: BigInt, amount: BigInt): EarlyAccessLicensesClaimed {
    let earlyAccessLicensesClaimedEvent = changetype<EarlyAccessLicensesClaimed>(newMockEvent())

    earlyAccessLicensesClaimedEvent.parameters = new Array()

    earlyAccessLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "account",
            ethereum.Value.fromAddress(account)
        )
    )

    earlyAccessLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "paid",
            ethereum.Value.fromUnsignedBigInt(paid)
        )
    )

    earlyAccessLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "amount",
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    )

    return earlyAccessLicensesClaimedEvent;
}

export function createFriendsFamilyLicensesClaimedEvent(account: Address, paid: BigInt, amount: BigInt): FriendsFamilyLicensesClaimed {
    let friendsFamilyLicensesClaimedEvent = changetype<FriendsFamilyLicensesClaimed>(newMockEvent())

    friendsFamilyLicensesClaimedEvent.parameters = new Array()

    friendsFamilyLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "account",
            ethereum.Value.fromAddress(account)
        )
    )

    friendsFamilyLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "paid",
            ethereum.Value.fromUnsignedBigInt(paid)
        )
    )

    friendsFamilyLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "amount",
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    )

    return friendsFamilyLicensesClaimedEvent;
}

export function createTeamLicensesClaimedEvent(account: Address, amount: BigInt): TeamLicensesClaimed {
    let teamLicensesClaimedEvent = changetype<TeamLicensesClaimed>(newMockEvent())

    teamLicensesClaimedEvent.parameters = new Array()

    teamLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "account",
            ethereum.Value.fromAddress(account)
        )
    )

    teamLicensesClaimedEvent.parameters.push(
        new ethereum.EventParam(
            "amount",
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    )

    return teamLicensesClaimedEvent;
}