import React from "react";
import { Lock } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";

function NewPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
  };

  return (
    <AuthCard title="Create new password">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={"password"}
              required
              label="New password"
              icon={<Lock size={20} />}
              placeholder="Enter new password"
            />
          </div>

          <div className="relative">
            <Input
              id="confirm-password"
              name="confirm-password"
              type={"password"}
              required
              label="Confirm new password"
              icon={<Lock size={20} />}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Button text={"Reset Password"} />
        </div>
      </form>
    </AuthCard>
  );
}

export default NewPassword;
