import React from "react"; // ✅ Required for JSX
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("Login Component", () => {
  it("renders login form", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits the form", async () => {
    axios.post.mockResolvedValue({ data: { message: "Login successful" } });
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("Login successful")
    );

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/login", {
      email: "test@example.com",
      password: "password123",
    });
  });
});
