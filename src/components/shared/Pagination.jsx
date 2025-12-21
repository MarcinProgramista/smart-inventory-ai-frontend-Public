export default function Pagination({
  page,
  totalPages,
  canPrev,
  canNext,
  onPrev,
  onNext,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <button onClick={onPrev} disabled={!canPrev}>
        ◀ Prev
      </button>

      <span>
        Page {page} / {totalPages || 1}
      </span>

      <button onClick={onNext} disabled={!canNext}>
        Next ▶
      </button>
    </div>
  );
}
