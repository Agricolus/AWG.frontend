<template>
  <div class="stations">
    <header>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input id="text" type="text" placeholder="Find a weather station" v-model="needle">
      </div>
    </header>
    <section class="first">
      <button class="btn btn-primary">
        <i class="fas fa-plus left-icon"></i>
        ADD A NEW STATIONS
      </button>
    </section>
    <section class="second">
      <table class="table" v-if="stations">
        <thead>
          <tr>
            <th>Name</td>
            <th>Status</th>
            <th>Location</th>
            <th>id</th>
            <th>Date Created</th>
            <th>Type</th>
            <th class="btn-colum"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in filteredStations" :key="station.id">
            <td>{{ station.name }}</td>
            <td>
              <i class="fas fa-circle red-status"></i>
            </td>
            <td>{{ station.location }}</td>
            <td>{{ station.id }}</td>
            <td>{{ station.dateCreated | dateformat }}</td>
            <td>{{ station.type }} </td>
            <td class="btn-colum">
              <button class="btn btn-primary btn-sm">
                <i class="fas fa-arrow-right"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    

  </div>
</template>
<script src="./Stations.ts" lang="ts"/>
