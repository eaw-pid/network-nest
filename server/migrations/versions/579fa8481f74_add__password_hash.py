"""add _password_hash

Revision ID: 579fa8481f74
Revises: 7d19e2f4b519
Create Date: 2024-02-23 09:41:19.267080

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '579fa8481f74'
down_revision = '7d19e2f4b519'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###
