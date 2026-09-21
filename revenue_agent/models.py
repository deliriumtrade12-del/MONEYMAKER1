from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class Lead:
    name: str = ""
    company: str = ""
    role: str = ""
    website: str = ""
    source: str = "csv"
    consent_or_relationship: str = ""
    issue: str = ""
    email: str = ""
    profile_url: str = ""
    notes: str = ""


@dataclass
class AuditResult:
    website: str
    reachable: bool
    score: int
    issues: list[str] = field(default_factory=list)
    recommendations: list[str] = field(default_factory=list)
    service: str = "website"


@dataclass
class DraftOffer:
    lead: dict[str, Any]
    service: str
    score: int
    priority: str
    subject: str
    body: str
    estimated_value: str
    status: str = "needs_human_approval"


@dataclass
class SalesRecord:
    company: str
    contact: str = ""
    service: str = "website"
    status: str = "new"
    score: int = 0
    notes: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return self.__dict__.copy()

    def approve(self) -> None:
        self.status = "approved"
