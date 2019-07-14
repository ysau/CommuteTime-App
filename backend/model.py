import os

from dotenv import load_dotenv
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

load_dotenv()
DB_URL = os.getenv("SQLALCHEMY_URL")

engine = create_engine(DB_URL)
Session = scoped_session(sessionmaker(autocommit=False,
                                      autoflush=False,
                                      bind=engine))

Base = declarative_base()


class Home(Base):
  __tablename__ = 'home'

  id = Column(Integer, primary_key=True)
  home = Column(String)
  work1 = Column(String)
  work2 = Column(String)

  def __repr__(self):
    return "<Home(home={}, work1={}, work2={})>".format(self.home, self.work1, self.work2)


def query_home_recommendation(work1, work2):
  session = Session()
  return session.query(Home.home).filter_by(work1=work1).filter_by(work2=work2).first()[0]


def query_cities(term):
  session = Session()
  results = session.query(Home.home).filter(Home.home.ilike("%{}%".format(term.strip()))).distinct().all()
  return [r for (r,) in results]


if __name__ == '__main__':
  a = query_cities(" aLto ")
  print(a)
  b = query_home_recommendation("Sunnyvale", "Fremont")
  print(b)
