from revenue_agent.dashboard import build_dashboard


def test_dashboard_empty_queue() -> None:
    assert build_dashboard([])["total"] == 0


def test_dashboard_counts_services() -> None:
    result = build_dashboard([{"service": "website", "priority": "high", "score": 80}])
    assert result["services"] == {"website": 1}
    assert result["highest_score"] == 80
