import Topic from "./Topic";

function PopularActivitiesComponent({ popularActivities }) {
  console.log(popularActivities);
  return (
    <div className="flex min-h-100 flex-col gap-10 rounded-xl bg-white p-10">
      <Topic text="Popular Activities" />
      <ul className="flex flex-col gap-10 rounded-sm font-sans text-2xl text-stone-800">
        {popularActivities.map((activity, i) => (
          <ListItem activity={activity} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default PopularActivitiesComponent;

function ListItem({ activity }) {
  return (
    <li className="rounded-sm bg-stone-50 py-5 pl-4 transition-all duration-300 hover:scale-103 hover:shadow-sm">
      {activity}
    </li>
  );
}
