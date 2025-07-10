"use client";

import {
  ExclamationCircleIcon,
  FlagIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { useFormStatus } from "react-dom";
import { updateProfile } from "../_lib/actions";
import { useRef, useState } from "react";
import { uploadToCoudinary } from "../_lib/helpers";

function UpdateProfileForm({ guest, children }) {
  const imageInpRef = useRef(null);
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const { fullName, email, nationality, countryFlag, nationalID } = guest;
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setError(null);

    try {
      let imageUrl = null;
      setIsUploading(true);

      // Upload image if selected
      if (img) {
        const res = await uploadToCoudinary(img);
        imageUrl = res.secure_url;

        setUploaded(true);
      }

      // Append imgUrl if exists
      if (imageUrl) {
        formData.append("profile", imageUrl);
      }

      const result = await updateProfile(formData);

      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  function handleImgChange(e) {
    const img = e.target.files[0];
    setImg(img);
    setUploaded(false);
  }

  return (
    <form
      action={handleSubmit}
      className="bg-primary-900 py-4 sm:py-8 px-6 sm:px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label className="block">Full name</label>
        <input disabled className="form__inpt" defaultValue={fullName} />
      </div>

      <div className="space-y-2">
        <label className="block">Email address</label>
        <input
          disabled
          className="form__inpt"
          name="email"
          defaultValue={email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block">Where are you from?</label>
          {countryFlag ? (
            <img
              src={countryFlag}
              className="h-5 rounded-sm"
              alt="Country Flag"
            />
          ) : (
            <FlagIcon className="size-7" />
          )}{" "}
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label className="block">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="mt-3">
        <input
          type="file"
          ref={imageInpRef}
          accept="image/*"
          hidden
          onChange={handleImgChange}
        />
        <div
          onClick={() => imageInpRef.current.click()}
          className="cursor-pointer p-4 rounded-lg border-2 border-dashed border-primary-600 text-center"
        >
          {uploaded ? (
            <span className="text-accent-600 font-bold">Image Uploaded</span>
          ) : (
            <>
              {img ? (
                <p className="text-accent-400 font-bold">Image selected</p>
              ) : (
                <>
                  <div className="justify-center flex">
                    <div className="bg-accent-600 rounded-full p-4">
                      <ArrowUpTrayIcon className="size-5" />
                    </div>
                  </div>

                  <div className="mt-3">Upload Profile</div>
                </>
              )}
              <button
                type="button"
                className="border border-accent-500 px-4 py-2 mt-2 focus:outline-none"
              >
                {isUploading ? (
                  <span className="flex gap-3">
                    <SpinnerMini />
                    <span>Uploading image...</span>
                  </span>
                ) : (
                  "Choose a file"
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4 font-bold tracking-wider">
          {
            <div className="flex items-center justify-center gap-2">
              <ExclamationCircleIcon className="size-10" />
              <span className="text-lg">{error}</span>
            </div>
          }
        </div>
      )}

      <div className="flex justify-end items-center gap-6">
        <Button>Update Profile</Button>
      </div>
    </form>
  );
}

function Button() {
  const { pending, action, data, method } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? (
        <div className="flex items-center gap-3">
          <SpinnerMini />
          <span>Updating...</span>
        </div>
      ) : (
        "Update profile"
      )}
    </button>
  );
}

export default UpdateProfileForm;
