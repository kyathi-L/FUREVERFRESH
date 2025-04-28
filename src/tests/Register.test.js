import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../pages/Register";
import axios from "axios";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all input fields and button", () => {
    render(<Register />);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /phone number/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("submits the form when passwords match", async () => {
    axios.post.mockResolvedValue({ data: { message: "User registered successfully" } });
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Register />);
    screen.debug(); 
    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /phone number/i }), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("User registered successfully")
    );

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/register", {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      phone: "1234567890",
    });
  });

  it("alerts when passwords do not match", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Register />);

    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Mismatch" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "mismatch@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "654321" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /phone number/i }), {
      target: { value: "9876543210" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("Passwords do not match")
    );
  });
});
