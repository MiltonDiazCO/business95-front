<template>
  <div class="offcanvas offcanvas-start" id="sidebar-lateral">
    <div class="offcanvas-body px-0">
      <ul class="navbar-nav fs-5">
        <li class="navbar-item p-3 py-md-1">
          <router-link to="" class="nav-link">Mi Perfil</router-link>
        </li>

        <li class="navbar-item p-3 py-md-1">
          <router-link to="/inversiones" class="nav-link">Inversiones</router-link>
        </li>

        <li class="navbar-item p-3 py-md-1">
          <a
            href="#submenu-atajos"
            role="button"
            class="nav-link"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-controls="submenu-atajos"
            >Atajos
            <i class="bi bi-chevron-double-down"></i>
          </a>

          <div class="collapse" id="submenu-atajos">
            <ul class="navbar-nav fs-6 px-3">
              <li class="navbar-item">
                <router-link to="" class="nav-link">Nuevo Movimiento</router-link>
              </li>
              <li class="navbar-item">
                <router-link to="" class="nav-link">Nueva Actividad</router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="navbar-item p-3 py-md-1">
          <router-link to="" class="nav-link">Actividades Recientes</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#sidebar-lateral {
  width: 300px;
}

@media (max-width: 768px) {
  #sidebar-lateral {
    width: 55%;
  }
}
</style>

<script lang="ts" setup></script>
