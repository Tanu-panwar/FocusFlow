
import Container from "./layouts/containers/Container";

function FlashApp() {
  return (
    <div data-testid="appDiv" className="bg-gray-100 min-h-screen pb-10">
      <Container />
    </div>
  );
}

export default FlashApp;