import OverlayContainer from "./containers/OverlayContainer"
import SearchContainer from "./containers/SearchContainer"
import QuickSaveModal from "./components/QuickSaveModal"
import ErrorBoundary from "./components/ErrorBoundary"

export default function OverlayRoot() {
  return (
    <ErrorBoundary>
      <SearchContainer />
      <OverlayContainer />
      <QuickSaveModal />
    </ErrorBoundary>
  )
}
