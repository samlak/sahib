import SmallLoader from "./Loader/SmallLoader";

function ContinueButton({ onClick, label, isLoading, onEndMessage }) {
  return (
    <div 
      className="border-t-[1px] border-gray-200 -mx-5 pb-3 -mb-5 hover:cursor-pointer hover:bg-gray-100 rounded-b-xl"
      onClick={label ? onClick : () => {}}
    >
      {!isLoading ? (
        <div className="flex justify-center mt-3 mx-3">
          {label ? (
            <>
              <div className="mr-1 font-semibold">{label}</div>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m5 8.5 7 7 7.005-7" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round"></path>
              </svg>
            </>
          ) : (
            <div className="mr-1">{onEndMessage}</div>
          )}
        </div>
      ) : (
        <div className="ml-[calc(50%-44px)]">
          <SmallLoader />
        </div>
      )}
    </div>
  );
}
  
export default ContinueButton;