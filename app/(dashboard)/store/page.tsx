import LogoUpload from "@/components/features/store/LogoUpload";

export default function page() {
  return (
    <section>
      <div className="p-2 m-2 bg-white rounded-sm md:px-0 md:py-2 md:m-0 md:bg-none">
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="p-2">
            <h2 className="font-medium ">General setting</h2>
            <span className="block mb-2 text-sm">
              Configure the general settings for your store
            </span>

            <div className="f">
              <h2 className="mb-1 font-medium">Appearance</h2>

              <LogoUpload />
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </section>
  );
}
