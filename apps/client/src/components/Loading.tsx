import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
