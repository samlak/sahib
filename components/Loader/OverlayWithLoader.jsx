import CircularLoader from "./CircularLoader";

export default function OverlayWithLoader({ children }) {
  return (
    <div className="absolute top-0 left-0 bg-gray-300/30 w-full h-full flex justify-center items-center rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <CircularLoader />
        {children}
      </div>
    </div>
  );
}
