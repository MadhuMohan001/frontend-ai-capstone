import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm.jsx";

function fillValidFields(overrides = {}) {
  const values = {
    fullName: "Madhu Mohan",
    email: "madhu@example.com",
    password: "correct-horse",
    confirmPassword: "correct-horse",
    ...overrides,
  };

  fireEvent.change(screen.getByRole("textbox", { name: "Full name" }), {
    target: { value: values.fullName },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
    target: { value: values.email },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: values.password },
  });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: values.confirmPassword },
  });
}

describe("SettingsForm", () => {
  it("renders all settings fields and controls", () => {
    render(<SettingsForm />);

    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Full name" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("Confirm password")).toHaveAttribute("type", "password");
    expect(screen.getByRole("checkbox", { name: "Email notifications" })).toBeChecked();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("shows meaningful errors when an empty form is submitted", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 8 characters.")).toBeInTheDocument();
    expect(screen.getByText("Please confirm your password.")).toBeInTheDocument();
    expect(screen.getAllByRole("alert")).toHaveLength(4);
    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.queryByText("Your settings have been saved successfully.")).not.toBeInTheDocument();
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    fillValidFields({ email: "not-an-email" });

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
  });

  it("rejects a password shorter than eight characters", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    fillValidFields({ password: "short", confirmPassword: "short" });

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByText("Password must be at least 8 characters.")).toBeInTheDocument();
  });

  it("rejects passwords that do not match", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    fillValidFields({ confirmPassword: "different-password" });

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });

  it("shows a success message after valid submission", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    fillValidFields();

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Your settings have been saved successfully.",
    );
  });

  it("updates the email notifications checkbox when toggled", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    const checkbox = screen.getByRole("checkbox", { name: "Email notifications" });

    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
