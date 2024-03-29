"""add constraint to Company

Revision ID: f2631f957f3e
Revises: fb42efa3a347
Create Date: 2024-03-06 11:17:44.129043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f2631f957f3e'
down_revision = 'fb42efa3a347'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('companies', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_companies_name'), ['name'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_users_username'), ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_users_username'), type_='unique')

    with op.batch_alter_table('companies', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_companies_name'), type_='unique')

    # ### end Alembic commands ###
