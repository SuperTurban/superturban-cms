<script>
      var component = {};
      module.exports = component;
</script>

<template>
      <main-header></main-header>
      <main-nav></main-nav>

      <div id="content">

            <div class="container">
                  <h3>Settings</h3>

                  <div class="editor">

                        <div class="editorline">
                              <div class="label">
                                    <h4>Site title</h4>
                              </div>
                              <div class="input">
                                    <input v-model = 'sitetitle'>
                              </div>
                        </div>

                        <div class="editorline">
                              <div class="label">
                                    <h4>Tracker</h4>
                              </div>
                              <div class="input">
                                    <input type="checkbox" v-model = 'sitetracker'>
                              </div>
                        </div>

            </div>

      </div>
</template>

<style>
</style>
