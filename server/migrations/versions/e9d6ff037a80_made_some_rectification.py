"""made some rectification

Revision ID: e9d6ff037a80
Revises: d605d22b6b03
Create Date: 2023-07-30 16:31:27.105432

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9d6ff037a80'
down_revision = 'd605d22b6b03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fk_booking_bus_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('fk_booking_user_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['fk_booking_user_id'], ['id'])
        batch_op.create_foreign_key(None, 'buses', ['fk_booking_bus_id'], ['id'])
        batch_op.drop_column('user_id')
        batch_op.drop_column('bus_id')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('company', sa.String(), nullable=True))
        batch_op.create_unique_constraint(None, ['password_hash'])
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.BLOB(), nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('company')
        batch_op.drop_column('password_hash')

    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('bus_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'buses', ['bus_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.drop_column('fk_booking_user_id')
        batch_op.drop_column('fk_booking_bus_id')

    # ### end Alembic commands ###
