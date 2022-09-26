import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import {LandingPage} from "./LandingPage";

describe("LandingPage", () => {

    
  it('Tiene una imagen como logo de Pokemon', () => {
      render(<Provider store={store}><BrowserRouter><LandingPage/></BrowserRouter></Provider>);
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    })
});
