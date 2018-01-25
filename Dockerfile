FROM node:latest

MAINTAINER shardrealms@gmail.com

WORKDIR /home/default

# Have to initialize build time arguments like so
# https://docs.docker.com/engine/reference/commandline/build/#/set-build-time-variables---build-arg
ARG SET_NODE_ENV
ENV NODE_ENV=${SET_NODE_ENV}

# Only copy in files needed for npm install - this will decrease build time by building from cache if these files have not changed
COPY ./package.json /home/default/package.json
COPY ./npm-shrinkwrap.json /home/default/npm-shrinkwrap.json

# npm install (based on NODE_ENV environment envariable, either exclude/include dev dependencies)
RUN npm install

# Get everything in current directory that's not in .dockerignore
COPY . /home/default

# App Build - (if you have a build process)
#RUN npm run build-app

# Expose port
EXPOSE 80
ENV EXPRESS_PORT=80

## Set env vars
# Not secret
ENV MYSQL_HOST 'shardrealms.com'
ENV MYSQL_USER 'sr_creation_dev'
ENV MYSQL_DATABASE 'sr_creation_dev'
ENV MYSQL_PORT '3306'

# Secret
ENV MYSQL_PASSWORD 'not_password'


# Default command to run for non-dev environments
# https://docs.docker.com/engine/reference/builder/
CMD ["npm","start"]