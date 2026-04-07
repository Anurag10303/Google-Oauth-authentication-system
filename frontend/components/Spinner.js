export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-stone-200 dark:border-stone-800" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400 animate-spin" />
      </div>
    </div>
  );
}
