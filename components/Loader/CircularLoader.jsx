export default function CircularLoader({ 
  outerStyle = "h-16 w-16",
  innerStyle = "h-10 w-10",
  innerBg = "bg-[#F1F2F4]"
}) {
  return (
    <div className={`flex ${outerStyle} items-center justify-center rounded-full bg-gradient-to-tr from-gray-800 to-gray-400 animate-spin`}>
      <div className={`${innerStyle}  rounded-full ${innerBg}  p-0`}></div>
    </div>
  );
}
