import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ children }) {
  return (
    <form className="bg-primary-900 py-4 sm:py-8 px-6 sm:px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label className="block">Full name</label>
        <input disabled className="form__inpt" />
      </div>

      <div className="space-y-2">
        <label className="block">Email address</label>
        <input disabled className="form__inpt" name="email" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block">Where are you from?</label>
          <img src="/logo.png" className="h-5 rounded-sm" alt="Country Flag" />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label className="block">National ID number</label>

        <input
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
