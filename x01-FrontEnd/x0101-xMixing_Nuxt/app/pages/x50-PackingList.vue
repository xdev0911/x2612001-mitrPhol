<script setup lang="ts">
import { ref, computed } from 'vue'

const version = '0.1'

// --- Left Panel Data ---
const selectedBatchId = ref('2025-11-12-01001')
const productionList = ref([
  '2025-11-12-01001-1/3-50.0/50.0/120.0',
  '2025-11-12-01001-2/3-50.0/100.0/120.0',
  '2025-11-12-01001-1/3-50.0/50.0/120.0',
  '2025-11-12-01001-2/3-50.0/100.0/120.0',
])
const selectedProductionIndices = ref<number[]>([])

// --- Right Panel Data ---
const plantId = computed(() => {
  if (!selectedBatchId.value) return ''
  // Format: YYYY-MM-DD-SSNNN (e.g. 2025-11-12-01001)
  const parts = selectedBatchId.value.split('-')
  // We expect at least year, month, day, and the suffix code
  // parts: ['2025', '11', '12', '01001']
  if (parts.length < 4) return ''
  const suffix = parts[3] || ''
  if (suffix.length < 2) return ''
  const plantCode = suffix.substring(0, 2)
  return `Mixing-${plantCode}`
})
const packagingSetId = computed(() => {
  if (!selectedBatchId.value) return ''
  return `PKG-${selectedBatchId.value}`
})

interface PackingItem {
  id: string
  weight: string // Display string like '50/50.0'
  isVerified: boolean
}

const packingItems = ref<PackingItem[]>([
  { id: '2025-11-12-01001-1/3-50.0/50.0/120.0', weight: '50/50.0', isVerified: true },
  { id: '2025-11-12-01001-2/3-50.0/100.0/120.0', weight: '0/50.0', isVerified: false },
  { id: '2025-11-12-01001-1/3-50.0/50.0/120.0', weight: '50/50.0', isVerified: true },
  { id: '2025-11-12-01001-2/3-50.0/100.0/120.0', weight: '0/50.0', isVerified: false },
  { id: '2025-11-12-01001-1/3-50.0/50.0/120.0', weight: '0/50.0', isVerified: false },
  { id: '2025-11-12-01001-2/3-50.0/100.0/120.0', weight: '0/50.0', isVerified: false },
])

// --- Actions ---
const onTransfer = () => {
  // Logic to transfer selected item from left to right would go here
  console.log('Transfer clicked', selectedProductionIndices.value)
}

const onCreatePackingList = () => {
  console.log('Create Packing List clicked')
}

const onClosePackingList = () => {
  console.log('Close Packing List clicked')
}

const onPrintPackingList = () => {
  console.log('Print Packing List clicked')
}

const onSelectProductionItem = (index: number) => {
  const i = selectedProductionIndices.value.indexOf(index)
  if (i > -1) {
    selectedProductionIndices.value.splice(i, 1)
  } else {
    selectedProductionIndices.value.push(index)
  }
}
</script>

<template>
  <q-page class="q-pa-md bg-white">
    <!-- Header Version -->
    <div class="row justify-end q-mb-sm">
      <div class="text-caption text-weight-bold">Version {{ version }}</div>
    </div>

    <div class="row q-col-gutter-md">
      <!-- LEFT COLUMN: Production PlanList -->
      <div class="col-12 col-md-5">
        <div class="text-subtitle2 q-mb-xs">Production PlanList</div>
        <!-- Date Selector -->
        <!-- Date Selector (Batch ID) -->
        <q-select
          outlined
          v-model="selectedBatchId"
          :options="[
            '2025-11-12-01001',
            '2025-11-12-01002',
            '2025-11-12-01003',
            '2025-11-12-01004',
            '2025-11-12-02001',
            '2025-11-12-02002',
            '2025-11-12-02012',
          ]"
          dense
          class="q-mb-md"
          dropdown-icon="arrow_drop_down"
        />

        <!-- List Container -->
        <div class="list-container q-pa-none">
          <!-- Header -->
          <div class="row items-center q-pa-sm bg-grey-2 border-bottom">
            <div class="col-12 text-weight-bold">PackingList</div>
          </div>

          <!-- List Items -->
          <div class="col scroll">
            <div
              v-for="(item, index) in productionList"
              :key="index"
              v-ripple
              class="row items-center q-pa-sm border-bottom cursor-pointer"
              :class="{
                'bg-blue-3': selectedProductionIndices.includes(index),
                'bg-blue-1': !selectedProductionIndices.includes(index) && index % 2 === 0,
                'bg-white': !selectedProductionIndices.includes(index) && index % 2 !== 0,
              }"
              @click="onSelectProductionItem(index)"
            >
              <div class="col-12 text-blue-8" style="word-break: break-all">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MIDDLE COLUMN: Transfer Button -->
      <div class="col-12 col-md-2 flex flex-center">
        <q-btn
          icon="play_arrow"
          size="lg"
          square
          outline
          color="grey-6"
          class="transfer-btn q-pa-md"
          @click="onTransfer"
        />
      </div>

      <!-- RIGHT COLUMN: Packaging Set -->
      <div class="col-12 col-md-5">
        <div class="row q-col-gutter-sm q-mb-md">
          <div class="col-4">
            <div class="text-subtitle2 q-mb-xs">PlantID</div>
            <q-input outlined :model-value="plantId" dense readonly />
          </div>
          <div class="col-8">
            <div class="text-subtitle2 q-mb-xs">Packaging Set</div>
            <q-input outlined :model-value="packagingSetId" dense readonly />
          </div>
        </div>

        <!-- Packing List Table/Card -->
        <div class="packing-list-container column">
          <!-- Header -->
          <div class="row items-center q-pa-sm bg-grey-2 border-bottom">
            <div class="col-7 text-weight-bold">Packing ID</div>
            <div class="col-3 text-weight-bold text-center">Net Weight (kg)</div>
            <div class="col-2 text-weight-bold text-right q-pr-sm">
              Status <q-icon name="qr_code_scanner" size="xs" />
            </div>
          </div>

          <!-- Rows -->
          <div class="col scroll q-pa-none">
            <div
              v-for="(item, index) in packingItems"
              :key="index"
              class="row items-center q-pa-sm border-bottom"
              :class="{ 'bg-blue-1': index % 2 === 0, 'bg-white': index % 2 !== 0 }"
            >
              <div class="col-7 text-blue-8" style="word-break: break-all">
                {{ item.id }}
              </div>
              <div class="col-3 text-blue-8 text-center text-weight-medium">
                {{ item.weight }}
              </div>
              <div class="col-2 text-right q-pr-sm">
                <q-icon
                  name="search"
                  size="md"
                  :class="item.isVerified ? 'text-green-6' : 'text-grey-8'"
                >
                  <q-badge
                    v-if="item.isVerified"
                    floating
                    color="transparent"
                    text-color="green"
                    icon="check"
                    style="top: 5px; right: 5px; font-size: 8px"
                  />
                  <!-- Using nested icon trick or just switching icon based on state -->
                </q-icon>
                <!-- Alternative icon logic to match image "magnifying glass with check" -->
                <q-icon
                  v-if="item.isVerified"
                  name="check_circle"
                  color="positive"
                  class="absolute-bottom-right"
                  style="font-size: 10px"
                />
              </div>
            </div>
          </div>

          <!-- Footer (Totals) -->
          <div class="row items-center q-pa-md border-top bg-white q-mt-auto">
            <div class="col-5 text-blue-8">Total Package in this Box</div>
            <div class="col-3 text-blue-8 text-center">2/6 pcs</div>
            <div class="col-2 text-blue-8 text-right">Weight</div>
            <div class="col-2 text-blue-8 text-right">100/300 kg</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="row justify-end q-gutter-md q-mt-md">
          <q-btn
            label="Creat Packing List"
            color="grey-6"
            no-caps
            unelevated
            @click="onCreatePackingList"
          />
          <q-btn
            label="Close Packing List"
            color="grey-6"
            no-caps
            unelevated
            @click="onClosePackingList"
          />
          <q-btn label="Print" color="grey-6" no-caps unelevated @click="onPrintPackingList" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.list-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.packing-list-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 500px; /* Matched to list-container */
  background-color: white;
  display: flex;
  flex-direction: column;
}

.border-bottom {
  border-bottom: 1px solid #ccc;
}

.border-top {
  border-top: 2px solid #777;
}

.transfer-btn {
  height: 80px;
  width: 50px;
  border: 1px solid #aaa;
}
</style>
