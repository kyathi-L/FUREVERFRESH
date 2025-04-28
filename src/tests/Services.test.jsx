import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Services from "../pages/Services";
import '@testing-library/jest-dom';

describe("Services Component", () => {
  it("renders all service boxes", () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Pet Boarding")).toBeInTheDocument();
    expect(screen.getByText("Pet Grooming")).toBeInTheDocument();
    expect(screen.getByText("Pet Veterinary")).toBeInTheDocument();
    expect(screen.getByText("Pet Adoption")).toBeInTheDocument();
  });

  it("renders Book Now or Adopt button", () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    expect(screen.getAllByRole("button")).toHaveLength(5); // 5 services
  });
});
