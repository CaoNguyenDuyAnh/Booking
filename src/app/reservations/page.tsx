import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../action/getCurrentUser";
import getReservations from "../action/getReservations";
import ReservationsClient from "./ReservationsClient";

const getReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }
  const Reservations = await getReservations({
    authorId: currentUser.id
  });
  if(Reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No reservations found"
          subtitle="Looks like you have no reservations on your property"
        />
      </ClientOnly>
    )
  }
  return(
    <ClientOnly>
      <ReservationsClient
        reservations={Reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default getReservationsPage