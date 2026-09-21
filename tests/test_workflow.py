from revenue_agent.auth import require_approval
from revenue_agent.dashboard import build_dashboard
from revenue_agent.queue_store import set_status


def test_approval_required() -> None:
    try:
        require_approval(False)
    except PermissionError:
        return
    raise AssertionError("approval must be required")


def test_dashboard_empty_queue() -> None:
    assert build_dashboard([])["total"] == 0


def test_status_requires_approval(tmp_path) -> None:
    path = tmp_path / "queue.json"
    path.write_text('[{"id":"x","status":"needs_human_approval"}]', encoding="utf-8")
    try:
        set_status(path, "x", "approved", approved=False)
    except PermissionError:
        return
    raise AssertionError("status transition must require approval")
