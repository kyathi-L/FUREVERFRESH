import '@testing-library/jest-dom';

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Marketplace from "../pages/Marketplace";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

vi.mock("axios");

describe("Marketplace Component", () => {
  it("renders marketplace products", () => {
    render(
      <BrowserRouter>
        <Marketplace />
      </BrowserRouter>
    );

    expect(screen.getByText("Our Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Dog Food")).toBeInTheDocument();
    expect(screen.getByText("Cat Litter")).toBeInTheDocument();
    expect(screen.getByText("Dog Chew Toy")).toBeInTheDocument();
  });

  it("adds product to cart", async () => {
    render(
      <BrowserRouter>
        <Marketplace />
      </BrowserRouter>
    );

    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addToCartBtn);

    // Quantity UI should now appear
    expect(await screen.findByText("1")).toBeInTheDocument();
  });
});
