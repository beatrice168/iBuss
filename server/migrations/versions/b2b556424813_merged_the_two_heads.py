"""Merged the two heads

Revision ID: b2b556424813
Revises: 0d1a6d4ce761, ae3b8ccfd4bc
Create Date: 2023-08-09 19:15:36.021623

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2b556424813'
down_revision = ('0d1a6d4ce761', 'ae3b8ccfd4bc')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
