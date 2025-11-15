import MyTripsButtonRowButton from "./MyTripsButtonRowButton";

function ButtonRow() {
  return (
    <div className="flex items-center gap-4 bg-amber-400">
      <MyTripsButtonRowButton type="activeandupcomming">
        Active and Upcomming
      </MyTripsButtonRowButton>
      <MyTripsButtonRowButton type="draft">Draft</MyTripsButtonRowButton>
      <MyTripsButtonRowButton type="past">Past</MyTripsButtonRowButton>
    </div>
  );
}

export default ButtonRow;
